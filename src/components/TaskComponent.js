import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import ConfirmComponent from './ConfirmComponent';

class TaskComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskToDeleteId: null
    };
  }

  statusType = {
    DEFAULT: 'WAITING',
    ACTIVE: 'ACTIVE',
    DONE: 'DONE',
    DELETED: 'DELETED'
  };

  confirmDeleteTask = id => {
    this.setState({
      taskToDeleteId: id
    });
  };

  cancelDeleteTask = () => {
    this.setState({
      taskToDeleteId: null
    });
  };

  deleteTask = taskId => {
    this.props.onDeleteTask(this.state.taskToDeleteId);
    this.setState({
      taskToDeleteId: null
    });
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
        panelStyle = 'panel panel-warning';
    }
    return panelStyle;
  };

  onToggleTimer = () => {
    this.props.onToggleTimer(this.props.task.id);
  };

  render() {
    let {task, isActive, isTimerRunning} = this.props;
    let deleteConfirmVisible = this.state.taskToDeleteId ? true : false;

    return (
      <div className={this.getTaskUIStyle()}>
        <div className="panel-heading text-left">
          <ConfirmComponent visible={deleteConfirmVisible} action={this.deleteTask} close={this.cancelDeleteTask} />

          <div className="row">
            <div className="col-md-9">
              <h2 className="panel-title">
                <b>{task.title}</b>
              </h2>
            </div>
            <div className="col-md-3 text-right">
              <Button onClick={() => this.confirmDeleteTask(task.id)}>
                <Glyphicon glyph="remove" />
              </Button>
            </div>
          </div>
        </div>

        <div className="panel-body text-left">{task.description}</div>

        <div className="panel-footer">
          <div className="row tsk-footer">
            <div className="col-md-6 text-left  ">
              {this.renderStartButton()}
              Time spent: {this.renderTimer(task)}
            </div>
            <div className="col-md-3">Started on: {task.startDate}</div>
            <div className="col-md-3">STATUS: {this.getTaskStatus()}</div>
          </div>
        </div>
      </div>
    );
  }

  renderStartButton() {
    if (this.getTaskStatus() === this.statusType.DONE) return;
    let {isActive, isTimerRunning} = this.props;
    let glyphImg = isTimerRunning && isActive ? 'stop' : 'play';
    return (
      <span>
        <Button className="tsk-btn" onClick={() => this.onToggleTimer()}>
          <Glyphicon glyph={glyphImg} />
        </Button>
      </span>
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
