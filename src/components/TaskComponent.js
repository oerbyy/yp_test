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

  statusType = {
    DEFAULT: 'DEFAULT',
    ACTIVE: 'ACTIVE',
    DONE: 'DONE',
    DELETED: 'DELETED'
  };

  render() {
    let task = this.state.task;

    return (
      <div class={this.getTaskUIStyle()}>
        <div class="panel-heading">
          <h2 class="panel-title">
            <b>{task.title}</b>
          </h2>
        </div>

        <div class="panel-body text-left">{task.description}</div>

        <div class="panel-footer">
          <div class="row" style={{justifyContent: 'space-between'}}>
            <div class="col-md-4">Time spent: {task.timeRecorded} mins</div>
            <div class="col-md-4">Started on: {task.startDate}</div>
            <div class="col-md-4">STATUS: {this.getTaskStatus()}</div>
          </div>
        </div>
      </div>
    );
  }

  getTaskStatus() {
    let task = this.state.task;

    let status = this.statusType.DEFAULT;
    if (this.state.isActive) status = this.statusType.ACTIVE;
    if (task.done) status = this.statusType.DONE;
    if (task.deleted) status = this.statusType.DELETED;
    return status;
  }

  getTaskUIStyle() {
    let panelStyle = '';
    switch (this.getTaskStatus()) {
      case this.statusType.ACTIVE:
        panelStyle = 'panel panel-primary';
        break;
      case this.statusType.DONE:
        panelStyle = 'panel panel-success';
        break;
      case this.statusType.DELETED:
        panelStyle = 'panel panel-danger';
        break;
      default:
        panelStyle = 'panel panel-default';
    }
    return panelStyle;
  }
}

export default TaskComponent;
