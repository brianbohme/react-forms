import React from 'react';
import { Link } from 'react-router-dom';


export default class NewPlaylist extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      inputValue: "", disabled: true};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({ inputValue: event.target.value }, () => (this.state.inputValue.length > 16 || this.state.inputValue === "") ? this.setState({ disabled: true }) : this.setState({ disabled: false }))
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.inputValue);
    this.setState({inputValue: ""})
  }

  render () {
    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" onChange={this.handleChange} value={this.state.inputValue}/>
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
