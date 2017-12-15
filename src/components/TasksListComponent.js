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

  async getTasks() {
    let items = await tasksServiceStubs.getTasks();
    this.setState({tasks: items});
  }

  async getActiveTaskId() {
    let item = await tasksServiceStubs.getActiveTaskId();
    this.setState({activeTaskId: item});
  }

  addNewTask(taskData) {
    let newTasks = this.state.tasks.slice();
    newTasks.push(taskData);
    this.setState({tasks: newTasks});
  }

  deleteTask(taskId) {
    let newTasks = this.state.tasks.map(item => {
      if (item.id === taskId) item.deleted = true;
      return item;
    });
    this.setState({tasks: newTasks});
  }

  handleCloseForm() {
    this.setState({showModal: false});
  }

  handleAddTask(taskData) {
    this.addNewTask(taskData);
    this.setState({showModal: false});
  }

  handleDeleteTask(taskId) {
    this.props.actions.deleteTask(taskId);
  }

  render() {
    console.log('TASK', this.props);

    let tasks = this.props.tasks;
    return (
      <div>
        <div>
          {this.renderNewTaskForm()}
          <div class="row">
            <button type="button" class="btn btn-primary" onClick={() => this.setState({showModal: true})}>
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
              newid={this.state.tasks.length}
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
