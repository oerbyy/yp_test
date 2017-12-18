import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import autoBind from 'react-autobind';
import TaskComponent from './TaskComponent';
import TaskFormComponent from './TaskFormComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

class TasksListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTaskId: null,
      showModal: false
    };

    autoBind(this);
  }

  handleCloseForm() {
    this.props.actions.toggleShowModal(false);
  }

  handleAddTask(taskData) {
    this.props.actions.createTask(taskData);
    this.props.actions.toggleShowModal(false);
  }

  handleDeleteTask(taskId) {
    this.props.actions.deleteTask(taskId);
  }

  handleShowModal() {
    this.props.actions.toggleShowModal(true);
  }

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
        <SortableList items={this.props.tasks} onSortEnd={this.onSortEnd} pressDelay={150} />
      </div>
    );
  }

  renderItem(item, index) {
    if (item.deleted) return;

    let isActive = item.id === this.props.activeTaskId ? 1 : 0;

    const SortableItem = SortableElement(input => {
      let item = input.value;
      return <TaskComponent taskdata={item} isactive={isActive} onDeleteTask={this.handleDeleteTask} />;
    });

    return <SortableItem key={`item-${index}`} index={index} value={item} />;
  }

  renderNewTaskForm() {
    return (
      <div>
        <Modal show={this.props.showModal}>
          <Modal.Header>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskFormComponent
              newid={this.props.tasks.length}
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
    showModal: state.showModal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksListComponent);
