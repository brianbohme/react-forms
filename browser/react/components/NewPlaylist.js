import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class NewPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "", disabled: true, edited: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value, edited: true }, () => (this.state.inputValue.length > 16 || this.state.inputValue === "") ? this.setState({ disabled: true }) : this.setState({ disabled: false }))
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addPlaylist(this.state.inputValue);
    this.setState({ inputValue: "", edited: false });
  }

  render() {
    var alert;
    if (this.state.edited === true && (this.state.inputValue.length > 16 || this.state.inputValue === "")) {
      alert = <div className="alert alert-warning">Please enter a valid name</div>
    }

    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            <div>{alert}</div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" onChange={this.handleChange} value={this.state.inputValue} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={this.state.disabled}>Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
