import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import TasksComponent from './TasksComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to YP-test</h1>
        </header>
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-6">
            <TasksComponent />
          </div>
          <div class="col-md-3" />
        </div>
      </div>
    );
  }
}

export default App;
