import React from 'react';
import Songs from './Songs';
import axios from 'axios';
import AddSongForm from './AddSongForm';

export default class Playlist extends React.Component {
  constructor (props) {
    super(props);
    this.state = { playlist: {} };
    this.reRender = this.reRender.bind(this)
    this.playlistId = this.props.match.params.playlistId;
  }

  componentDidMount () {
    const playlistId = this.props.match.params.playlistId;

    axios.get(`api/playlists/${playlistId}`)
    .then(res => res.data)
    .then(playlist => {this.setState({playlist: playlist})})
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.playlistId !== nextProps.match.params.playlistId) {
      const playlistId = nextProps.match.params.playlistId;
      axios.get(`api/playlists/${playlistId}`)
        .then(res => res.data)
        .then(playlist => { this.setState({ playlist: playlist }) })
    }
  }

  reRender(){
    this.render()
  }

  render() {
    const playlist = this.state.playlist;

    return (
    <div>
      <h3>{playlist.name}</h3>
      <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
      {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
      <hr />
      <AddSongForm reRender={this.reRender} playlistId={this.playlistId}/>
    </div>
    )
  }
}
