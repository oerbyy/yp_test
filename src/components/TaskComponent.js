import React, {Component} from 'react';
import autoBind from 'react-autobind';

class TaskComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.taskdata
    };
    autoBind(this);
  }

  render() {
    let task = this.state.task;
    return <div class="alert alert-info">{task.title}</div>;
  }
}

export default TaskComponent;
