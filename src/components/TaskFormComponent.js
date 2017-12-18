import React, {Component} from 'react';
import autoBind from 'react-autobind';

class TaskFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.newid,
      priorityOrder: 0,
      title: '',
      description: '',
      startDate: new Date().toLocaleDateString('en-GB'),
      timeRecorded: 0,
      done: false,
      deleted: false
    };

    autoBind(this);
  }

  handleCloseForm(e) {
    this.props.onCloseForm();
  }
  handleAddTask(e) {
    this.props.onAddTask(this.state);
  }
  handleChangeTitle(e) {
    this.setState({title: e.target.value});
  }
  handleChangeDescription(e) {
    this.setState({description: e.target.value});
  }

  render() {
    return <div className="form-group">{this.showForm()}</div>;
  }

  showForm() {
    return (
      <div className="panel-primary">
        <div className="panel-heading text-left">
          <div className="panel-title">{this.renderTitle()}</div>
        </div>

        <div className="panel-body text-left">
          <div className="form-group">
            <label className="col-sm-2 control-label">Details</label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                onChange={this.handleChangeDescription}
                raws="5"
                placeholder="Tell more about it..."
              />
            </div>
          </div>
        </div>

        <div className="panel-footer" style={{justifyContent: 'space-between'}}>
          <input type="submit" className="btn btn-info" value="Create" onClick={this.handleAddTask} />
          <button className="btn btn-info" onClick={this.handleCloseForm} value="Cancel">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  renderTitle() {
    return (
      <div className="row">
        <div className="form-group">
          <label className="col-sm-2 control-label">Title</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              onChange={this.handleChangeTitle}
              placeholder="Name your Task"
            />
            <br />
          </div>
        </div>
      </div>
    );
  }
}
export default TaskFormComponent;
