import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import autoBind from 'react-autobind';
import TimerComponent from './TimerComponent';

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

  handleDeleteTask(taskId) {
    this.props.onDeleteTask(taskId);
  }

  render() {
    let task = this.state.task;
    let btnStyle = {
      position: 'relative',
      float: 'right'
    };

    return (
      <div class={this.getTaskUIStyle()}>
        <div class="panel-heading text-left">
          <div class="row">
            <div class="col-md-6">
              <h2 class="panel-title">
                <b>{task.title}</b>
              </h2>
            </div>
            <div class="col-md-5 text-right">{this.renderTimer()}</div>
            <div class="col-md-1 text-right">
              <Button onClick={() => this.handleDeleteTask(this.state.task.id)}>
                <Glyphicon glyph="remove" />
              </Button>
            </div>
          </div>
        </div>

        <div class="panel-body text-left">{task.description}</div>

        <div class="panel-footer">
          <div class="row" style={{justifyContent: 'space-between'}}>
            <div class="col-md-4">Time spent: {formatSecsToHMS(task.timeRecorded)}</div>
            <div class="col-md-4">Started on: {task.startDate}</div>
            <div class="col-md-4">STATUS: {this.getTaskStatus()}</div>
          </div>
        </div>
      </div>
    );
  }

  renderTimer() {
    if (this.state.isActive) return <TimerComponent />;
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

function formatSecsToHMS(secs) {
  let timePast = new Date(null);
  timePast.setSeconds(secs);
  return timePast.toISOString().substr(11, 8);
}

export default TaskComponent;
