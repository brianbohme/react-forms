import React from 'react';
import axios from 'axios';

export default class AddSongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { songs: [], selectedSong: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => { this.setState({ songs: songs }) })
  }

  handleChange(event) {

    axios.get(`/api/songs/${event.target.value}`)
    .then(res => res.data)
    .then(song => { this.setState({ selectedSong: song })})
  }

  handleSubmit(event) {
    event.preventDefault();
    const playlistId = this.props.playlistId;
    axios.post(`/api/playlists/${playlistId}/songs`, {song : this.state.selectedSong})
      .then(res => res.data)


      // .then(song => {
      //   this.setState({
      //     songs:
      //     [...this.state.songs, song]
      //   })
      // })
      // .then(success => {this.props.reRender()});
  }

  render() {
    const songs = this.state.songs;
    console.log(songs);

    return (
      <div className="well">
        <form className="form-horizontal" noValidate name="songSelect" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Add to Playlist</legend>
            <div className="form-group">
              <label htmlFor="song" className="col-xs-2 control-label">Song</label>
              <div className="col-xs-10">
                <select className="form-control" name="song" onClick={this.handleChange}>
                  {
                    songs.map(song => {
                      return (
                        <option value={song.id} key={song.id}>{song.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}
