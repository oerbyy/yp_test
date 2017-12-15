import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import autoBind from 'react-autobind';
import tasksServiceStubs from '../services/tasksServiceStubs';
import TaskComponent from './TaskComponent';
import TaskFormComponent from './TaskFormComponent';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class TasksListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTaskId: null,
      tasks: [],
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

  render() {
    console.log('TASK', this.props);

    let tasks = this.props.tasks;
    return (
      <div>
        <div>
          {this.renderNewTaskForm()}
          <div class="row">
            <button type="button" class="btn btn-primary" onClick={this.handleShowModal}>
              New Task
            </button>
          </div>
        </div>
        <br />

        <div>
          <div class="row">{tasks.map(item => this.renderItem(item))}</div>
        </div>
      </div>
    );
  }

  renderItem(item) {
    if (!item.deleted) {
      let isActive = item.id === this.props.activeTaskId ? 1 : 0;
      return <TaskComponent taskdata={item} isactive={isActive} onDeleteTask={this.handleDeleteTask} />;
    }
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
