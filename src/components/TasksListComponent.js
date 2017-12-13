import React, {Component} from 'react';
import autoBind from 'react-autobind';
import tasksServiceStubs from '../services/tasksServiceStubs';
import TaskComponent from './TaskComponent';

class TasksListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTaskId: null,
      tasks: []
    };

    autoBind(this);
  }

  async componentWillMount() {
    await this.getActiveTaskId();
    await this.getTasks();
  }

  async getTasks() {
    let items = await tasksServiceStubs.getTasks();
    this.setState({tasks: items});
  }

  async getActiveTaskId() {
    let item = await tasksServiceStubs.getActiveTaskId();
    this.setState({activeTaskId: item});
  }

  render() {
    // TODO: why 3 times loaded ????
    let tasks = this.state.tasks;
    return (
      <div>
        <div class="row">{tasks.map(item => this.renderItem(item))}</div>
      </div>
    );
  }

  renderItem(item) {
    let isActive = item.id === this.state.activeTaskId ? 1 : 0;
    return <TaskComponent taskdata={item} isactive={isActive} />;
  }
}

export default TasksListComponent;
