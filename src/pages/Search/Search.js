import React from "react";
import "./search.css";
import axios from "axios";
import Appbar from '../../config/navbar'
import {
  Typography,
  Paper,
  Container,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import AlbumIcon from "@material-ui/icons/Album";
import { Link } from "react-router-dom";

const styles = theme => ({

  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: "None",
    color: "White"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  buttonCollapse: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    margin: "10px",
    boxShadow: "none"
  },
  rootResponsive: {
    // position: "absolute",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    // [theme.breakpoints.down("lg")]: {
    //   display: "block"
    // },
    margin: "10px",
    paddingLeft: "16px",
    display: "flex",
    // right: 0,
    // position: "relative",
    // width: "100%",
    background: "transparent"
  },
  rootasd: {
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "50ch"
      }
    }
  }
});
class Search extends React.Component {
  constructor() {
    super();
    this.state = { trackName: "", artist: "", tracks: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }


  onclick = () => {
    const { trackName, artist } = this.state;
    var apikey = " ";

    axios
      // .get(
      //   `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${
      //     this.state.trackName
      //   }&page_size=10&page=10&s_track_rating=desc&apikey=${apikey}`
      // )
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=${artist}&q_track=${trackName}&apikey=${apikey}`
      )
      .then(response => {
       
        this.setState({
          tracks: response.data.message.body.track_list
        });
      }) // one extra step

      .catch(error => {
        alert('Error: ', error)
        console.error(error)
      })
  };
  render() {
    const { trackName, artist, tracks, } = this.state;
    // const { classes } = this.props;
    
    return (

      <div class="background">
        <Appbar />
        <Container maxWidth="lg">
          <div style={{ paddingTop: 70, }} >
            <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <LibraryMusicIcon
                  style={{
                    fontSize: 50
                  }}
                />
                <Typography style={{ fontFamily: 'Lusitana-Regular' }} variant="h2" component="h2">
                  Revolve
                </Typography>
              </div>

              <Typography
                style={{ textAlign: "center",fontFamily: 'Lusitana-Regular' }}
                variant="h6"
                component="h2"
              >
                Search Your Favourite Song Lyrics
              </Typography>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    label="Artist"
                    type="text"
                    margin="dense"
                    placeholder="Example i-e Akon, Akcent, Edward Maya etc..."
                    name="artist"
                    value={artist}
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    required
                    label="Track Name"
                    type="text"
                    margin="dense"
                    name="trackName"
                    value={trackName}
                    placeholder="Example i-e Smack That, Don't be Shy etc..."
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Button
                  disabled={artist ? false : true}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => this.onclick()}
                >
                  Get Lyrics
                </Button>
              </Grid>
            </Paper>
            <div style={{ paddingTop: 20 }}>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {/* body, */}
                {tracks.map((elem, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Link style={{ textDecoration: 'none' }} to={`/lyrics/${elem.track.track_id}`} target="_blank">
                      <figure class="snip1543 hover" style={{ cursor: 'pointer' }}
                      >
                        <img
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample101.jpg"
                          alt="sample100"
                        />
                        <figcaption>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="span"
                            style={{ fontFamily: "MyFont" }}
                          >

                            {elem.track.track_name.length <= 10
                              ? elem.track.track_name
                              : `${elem.track.track_name.substring(0, 20)}...`}
                          </Typography>
                          <div style={{ display: "flex", marginTop: 10 }}>
                            <BookmarkIcon />
                            <p style={{ marginLeft: 10 }}>
                              <b>Artist</b>: {`${elem.track.artist_name}`}
                            </p>
                          </div>
                          <div style={{ display: "flex", marginTop: 10 }}>
                            <AlbumIcon />
                            <p style={{ marginLeft: 10 }}>
                              <b>Album</b>: {`${elem.track.album_name}`}
                            </p>
                          </div>
                        </figcaption>
                      </figure>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </div>

            {/* <figure class="snip1543 hover"  style={{ cursor: 'pointer' }}>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample100.jpg"
                alt="sample100"
              />
              <figcaption>
                {this.state.trackName.length <= 10
                  ? this.state.trackName
                  : `${this.state.trackName.substring(0, 10)}... `}
                <h3>Alan Fresco</h3>
                <div style={{ display: "flex", marginTop: 10 }}>
                  <BookmarkIcon />
                  <p style={{ marginLeft: 10 }}>
                    <b>Artist</b>: The real fun of living wisely is that you get
                    to be smug about it.
                  </p>
                </div>
                <div style={{ display: "flex", marginTop: 10 }}>
                  <AlbumIcon />
                  <p style={{ marginLeft: 10 }}>
                    <b>Album</b>: The real fun of living wisely is that you get
                    to be smug about it.
                  </p>
                </div>
              </figcaption>
              <a href="#" />
            </figure> */}

          </div>
        </Container>
      </div>
    );
  }
}
export default withStyles(styles)(Search);
