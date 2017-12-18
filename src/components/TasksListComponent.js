import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import TaskComponent from './TaskComponent';
import TaskFormComponent from './TaskFormComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {clearInterval} from 'timers';

import messageHelper from '../helpers/messageHelper';

import './tasks.css';

class TasksListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTaskId: null,
      showModal: false
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    let {isTimerRunning} = this.props;
    if (isTimerRunning) {
      this.props.actions.incrementTaskTime();
    }
  };

  handleCloseForm = () => {
    this.props.actions.toggleShowModal(false);
  };

  handleAddTask = taskData => {
    this.props.actions.createTask(taskData);
    this.props.actions.toggleShowModal(false);
  };

  handleDoneTask = taskId => {
    this.props.actions.doneTask(taskId);
    messageHelper.showSuccess('Task has been DONE');
  };

  handleDeleteTask = taskId => {
    this.props.actions.deleteTask(taskId);
    messageHelper.showWarning('Task has been deleted');
  };

  handleShowModal = () => {
    this.props.actions.toggleShowModal(true);
  };

  handleOnToggleTimer = taskId => {
    let {isTimerRunning, activeTaskId} = this.props;
    if (isTimerRunning && activeTaskId === taskId) {
      this.props.actions.stopTimer();
    } else {
      this.props.actions.startTimer(taskId);
    }
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.actions.moveTask(oldIndex, newIndex);
  };

  render() {
    const SortableList = SortableContainer(input => {
      let items = input.items;

      return (
        <div>
          <div className="row">{items.map((item, index) => this.renderItem(item, index))}</div>
        </div>
      );
    });

    return (
      <div>
        <div>
          {this.renderNewTaskForm()}
          <div className="row">
            <button type="button" className="btn btn-primary" onClick={this.handleShowModal}>
              New Task
            </button>
          </div>
        </div>
        <br />
        <SortableList items={this.props.tasks} onSortEnd={this.onSortEnd} pressDelay={300} />
      </div>
    );
  }

  renderItem(item, index) {
    if (item.deleted) return;

    let isActive = item.id === this.props.activeTaskId ? true : false;

    const SortableItem = SortableElement(input => {
      let item = input.value;
      return (
        <TaskComponent
          task={item}
          isActive={isActive}
          isTimerRunning={this.props.isTimerRunning}
          onDoneTask={this.handleDoneTask}
          onDeleteTask={this.handleDeleteTask}
          onToggleTimer={this.handleOnToggleTimer}
        />
      );
    });

    return <SortableItem key={`item-${index}`} index={index} value={item} />;
  }

  renderNewTaskForm() {
    console.log;
    return (
      <div>
        <Modal show={this.props.showModal}>
          <Modal.Header>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskFormComponent
              newId={this.props.tasks.length}
              onCloseForm={this.handleCloseForm}
              onAddTask={this.handleAddTask}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    activeTaskId: state.activeTaskId,
    isTimerRunning: state.isTimerRunning,
    showModal: state.showModal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksListComponent);
