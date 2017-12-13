import React, {Component} from 'react';
import autoBind from 'react-autobind';

class TaskComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.taskdata,
      isActive: this.props.isactive
    };
    autoBind(this);
  }

  render() {
    let task = this.state.task;

    return (
      <div class={this.getTaskUIStyle()}>
        <div class="panel-heading">
          <h2 class="panel-title">{task.title}</h2>
        </div>
        <div class="panel-body">{task.description}</div>
      </div>
    );
  }

  getTaskUIStyle() {
    let task = this.state.task;
    let panelStyle = 'panel panel-default';
    if (this.state.isActive) panelStyle = 'panel panel-primary';
    if (task.done) panelStyle = 'panel panel-success';
    if (task.deleted) panelStyle = 'panel panel-danger';
    return panelStyle;
  }
}

export default TaskComponent;
