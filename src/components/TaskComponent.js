import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import autoBind from 'react-autobind';
import * as dateFns from 'date-fns';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';

class TaskComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.taskdata,
      isActive: this.props.isactive,
      isRunning: false
    };
    autoBind(this);
  }

  handleDeleteTask(taskId) {
    this.props.onDeleteTask(taskId);
  }

  render() {
    let task = this.state.task;
    let glyphImg = this.state.isRunning ? 'stop' : 'play';

    return (
      <div class={this.getTaskUIStyle()}>
        <div class="panel-heading text-left">
          <div class="row">
            <div class="col-md-9">
              <h2 class="panel-title">
                <b>{task.title}</b>
              </h2>
            </div>
            <div class="col-md-3 text-right">
              <Button onClick={() => this.handleDeleteTask(this.props.taskdata.id)}>
                <Glyphicon glyph="remove" />
              </Button>
            </div>
          </div>
        </div>

        <div class="panel-body text-left">{task.description}</div>

        <div class="panel-footer">
          <div class="row" style={{justifyContent: 'space-between'}}>
            <div class="col-md-6 text-left  ">
              <span>
                <Button onClick={() => this.onToggleTimer()}>
                  <Glyphicon glyph={glyphImg} />
                </Button>
              </span>
              Time spent: {this.renderTimer()}
            </div>
            <div class="col-md-3">Started on: {task.startDate}</div>
            <div class="col-md-3">STATUS: {this.getTaskStatus()}</div>
          </div>
        </div>
      </div>
    );
  }

  renderTimer() {
    let timePast = formatSecsToHMS(this.props.taskdata.timeRecorded);
    return <span>{timePast}</span>;
  }

  statusType = {
    DEFAULT: 'DEFAULT',
    ACTIVE: 'ACTIVE',
    DONE: 'DONE',
    DELETED: 'DELETED'
  };

  getTaskStatus() {
    let task = this.props.taskdata;

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

  startTimer = () => {
    this.setState({
      isRunning: true
    });
    this.timerID = setInterval(() => this.tick(), 1000);
  };

  stopTimer = () => {
    this.setState({
      isRunning: false
    });
    clearInterval(this.timerID);
  };

  tick() {
    this.props.actions.incrementTaskTimer(this.props.taskdata.id);
    this.setState({});
  }

  onToggleTimer() {
    this.state.isRunning ? this.stopTimer() : this.startTimer();
  }
}

function formatSecsToHMS(secs) {
  let timePast = new Date(null);
  timePast.setSeconds(secs);
  return timePast.toISOString().substr(11, 8);
}

function mapStateToProps(state) {
  return {
    task: state.task
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskComponent);
