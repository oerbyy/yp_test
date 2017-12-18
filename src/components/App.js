import React, {Component} from 'react';
import {ToastContainer} from 'react-toastify';
import logo from '../logo.svg';
import '../App.css';
import TasksListComponent from './TasksListComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to YP-Task </h1>
          <h3 className="App-title">
            * for <b>drag-n-drop</b> please hold a task for half second and then move on :){' '}
          </h3>
        </header>
        <br />
        <div className="row">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <TasksListComponent />
          </div>
          <div className="col-sm-3" />
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
