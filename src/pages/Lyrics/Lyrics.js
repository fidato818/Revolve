import React from "react";
import "./lyrics.css";
import axios from "axios";
import Appbar from '../../config/navbar'
import {
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
var moment = require('moment');
const styles = theme => ({
  title: {
    flexGrow: 1,
    textDecoration: "None",
    color: "White"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
});
class Lyrics extends React.Component {
  constructor() {
    super();
    this.state = { trackName: "", artist: "", tracks: [] };

  }

  componentDidMount() {
    this.getDataFromApi();
    this.getTrackDataFromApi();
console.log(this.props.match.params.id)
  }

  getDataFromApi() {
    var apikey = "ccbf85693e14c72e7f0d8ff1e98c67b8";
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        this.props.match.params.id
        }&apikey=${apikey}`
      )
      .then(response => {
        // console.log("response", response);

        this.setState({
          // lyrics_id: response.data.message.body.lyrics.lyrics_id,
          lyrics_body: response.data.message.body.lyrics.lyrics_body,
          // lyrics_copyright: response.data.message.body.lyrics.lyrics_copyright,
          updated_time: response.data.message.body.lyrics.updated_time
        });
      })
      .catch(error => {
        // alert('Error: ', error)
        console.error(error)
      })
    // }
  }
  getTrackDataFromApi() {
    var apikey = "ccbf85693e14c72e7f0d8ff1e98c67b8";
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
        this.props.match.params.id
        }&apikey=${apikey}`
      )

      .then(response => {
        // console.log("response", response.data.message.body.track);
        this.setState({
          // track_id: response.data.message.body.track.track_id,
          track_name: response.data.message.body.track.track_name,
          album_name: response.data.message.body.track.album_name,
          artist_name: response.data.message.body.track.artist_name
        });
      }) // one extra step
      // track_id, track_name, album_name, artist_name
      .catch(error => {
        // alert('Error: ', error) 
        console.error(error)
      })
    // }
  }


  render() {
    const {
      track_name,
      album_name,
      artist_name,
      lyrics_body,
      updated_time
    } = this.state;
    return (
      <div>
        <Appbar />
        <Container maxWidth="md">
          <div style={{ paddingTop: 70, }}>
            <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
              {/* <button onClick={this.props.history.goBack}>Back</button> */}

              <Typography style={{ fontFamily: 'Lusitana-Regular', margin: 15, fontSize: 'large' }}><b>Track Name:</b> {track_name}</Typography>
              <Typography style={{ fontFamily: 'Lusitana-Regular', margin: 15, fontSize: 'large' }}><b>Album Name:</b> {album_name}</Typography>
              <Typography style={{ fontFamily: 'Lusitana-Regular', margin: 15, fontSize: 'large' }}><b>Artist Name:</b> {artist_name}</Typography>

              <div className="display-linebreak" style={{ margin: 15 }}>
                Lyrics: {lyrics_body ? lyrics_body : 'Lyrics Not Found'}
              </div>
              <Typography style={{ fontFamily: 'Lusitana-Regular', margin: 15, fontSize: 'large' }}><b>Lyrics Update Time:</b>{moment(updated_time).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Typography>
            </Paper>
          </div>

        </Container>
      </div>
    );
  }
}
export default withStyles(styles)(Lyrics);
