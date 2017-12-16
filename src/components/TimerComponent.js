import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import * as dateFns from 'date-fns';

class TimerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initDate: new Date(),
      dateNow: new Date(),
      isRunning: false
    };
  }

  startTimer = () => {
    this.setState({
      initDate: new Date(),
      dateNow: new Date(),
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
    this.setState({
      dateNow: new Date()
    });
  }

  formatSecsToHMS = secs => {
    let timePast = new Date(null);
    timePast.setSeconds(secs);
    return timePast.toISOString().substr(11, 8);
  };

  onToggleTimer() {
    this.state.isRunning ? this.stopTimer() : this.startTimer();
  }

  render() {
    let secsPast = dateFns.differenceInSeconds(this.state.dateNow, this.state.initDate);
    let timePast = this.formatSecsToHMS(secsPast);
    let glyphImg = this.state.isRunning ? 'stop' : 'play';

    return (
      <div>
        <span>
          <Button onClick={() => this.onToggleTimer()}>
            <Glyphicon glyph={glyphImg} />
          </Button>
        </span>
        <span>{timePast}</span>
      </div>
    );
  }
}

export default TimerComponent;
