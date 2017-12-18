import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';

class TaskComponent extends Component {
  constructor(props) {
    super(props);
  }

  statusType = {
    DEFAULT: 'DEFAULT',
    ACTIVE: 'ACTIVE',
    DONE: 'DONE',
    DELETED: 'DELETED'
  };

  handleDeleteTask = taskId => {
    this.props.onDeleteTask(taskId);
  };

  getTaskStatus = () => {
    let {task, isActive} = this.props;

    let status = this.statusType.DEFAULT;
    if (isActive) status = this.statusType.ACTIVE;
    if (task.done) status = this.statusType.DONE;
    if (task.deleted) status = this.statusType.DELETED;
    return status;
  };

  getTaskUIStyle = () => {
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
  };

  onToggleTimer = () => {
    this.props.onToggleTimer(this.props.task.id);
  };

  render() {
    let {task, isActive, isTimerRunning} = this.props;
    let glyphImg = isTimerRunning && isActive ? 'stop' : 'play';

    return (
      <div className={this.getTaskUIStyle()}>
        <div className="panel-heading text-left">
          <div className="row">
            <div className="col-md-9">
              <h2 className="panel-title">
                <b>{task.title}</b>
              </h2>
            </div>
            <div className="col-md-3 text-right">
              <Button onClick={() => this.handleDeleteTask(task.id)}>
                <Glyphicon glyph="remove" />
              </Button>
            </div>
          </div>
        </div>

        <div className="panel-body text-left">{task.description}</div>

        <div className="panel-footer">
          <div className="row" style={{justifyContent: 'space-between'}}>
            <div className="col-md-6 text-left  ">
              <span>
                <Button onClick={() => this.onToggleTimer()}>
                  <Glyphicon glyph={glyphImg} />
                </Button>
              </span>
              Time spent: {this.renderTimer(task)}
            </div>
            <div className="col-md-3">Started on: {task.startDate}</div>
            <div className="col-md-3">STATUS: {this.getTaskStatus()}</div>
          </div>
        </div>
      </div>
    );
  }

  renderTimer(task) {
    let timePast = formatSecsToHMS(task.timeRecorded);
    return <span>{timePast}</span>;
  }
}

function formatSecsToHMS(secs) {
  let timePast = new Date(null);
  timePast.setSeconds(secs);
  return timePast.toISOString().substr(11, 8);
}

export default TaskComponent;
