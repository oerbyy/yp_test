import React, {Component} from 'react';
import autoBind from 'react-autobind';
import tasksServiceStubs from '../services/tasksServiceStubs';

class TasksComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };

    autoBind(this);
  }

  async componentWillMount() {
    await this.getTasks();
  }

  async getTasks() {
    let items = await tasksServiceStubs.getTasks();
    this.setState({tasks: items});
  }

  render() {
    let tasks = this.state.tasks;
    return (
      <div>
        <div class="row">{tasks.map(item => this.renderItem(item))}</div>
      </div>
    );
  }

  renderItem(item) {
    return <div class="alert alert-info">{item.title}</div>;
  }
}

export default TasksComponent;
