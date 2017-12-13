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
    return <div class="form-group">{this.showForm()}</div>;
  }

  showForm() {
    return (
      <div class="panel-primary">
        <div class="panel-heading text-left">
          <div class="panel-title">{this.renderTitle()}</div>
        </div>

        <div class="panel-body text-left">
          <div class="form-group">
            <label class="col-sm-2 control-label">Details</label>
            <div class="col-sm-10">
              <textarea
                class="form-control"
                onChange={this.handleChangeDescription}
                raws="5"
                placeholder="Tell more about it..."
              />
            </div>
          </div>
        </div>

        <div class="panel-footer" style={{justifyContent: 'space-between'}}>
          <input type="submit" class="btn btn-info" value="Create" onClick={this.handleAddTask} />
          <button class="btn btn-info" onClick={this.handleCloseForm} value="Cancel">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  renderTitle() {
    return (
      <div class="row">
        <div class="form-group">
          <label class="col-sm-2 control-label">Title</label>
          <div class="col-sm-10">
            <input class="form-control" type="text" onChange={this.handleChangeTitle} placeholder="Name your Task" />
            <br />
          </div>
        </div>
      </div>
    );
  }
}
export default TaskFormComponent;
