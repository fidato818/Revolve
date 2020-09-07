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
import { Alert, AlertTitle } from '@material-ui/lab';
import AlbumIcon from "@material-ui/icons/Album";
import { Link } from "react-router-dom";
import Fade from 'react-reveal/Fade';
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
    this.state = { trackName: "", artist: "", tracks: [], offline: false, isDisconnected: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener("online", this.handleConnectionChange);
    window.addEventListener("offline", this.handleConnectionChange);
  }
  componentWillUnmount() {
    window.removeEventListener("online", this.handleConnectionChange);
    window.removeEventListener("offline", this.handleConnectionChange);
  }


  //Why choose google.com?

  // The reason behind sending the get request to google.com
  // instead of any random platform is because it has great uptime.
  // The idea here is to always send the request to a service that
  // is always online. If you have a server, you could create a dedicated route
  // that can replace the google.com domain but you have to be sure that
  // it has an amazing uptime.

  handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("https://www.google.com/", {
          // Check for internet connectivity
          mode: "no-cors"
        })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing);
            });
          })
          .catch((error) => console.log(error));
      }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true });
  };
  onclick = () => {
    const { trackName, artist } = this.state;
    var apikey = "ccbf85693e14c72e7f0d8ff1e98c67b8";

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
        localStorage.setItem(
          "Data",
          JSON.stringify(response.data.message.body.track_list)
        )
      })

      .catch(error => {
        // alert('Error: ', error)
        // console.error(error)
        let collection = localStorage.getItem("Data");
        console.log("collection, ", collection)
        this.setState({
          tracks: collection,
          offline: true
        });
      })
  };
  render() {
    const { trackName, artist, tracks, isDisconnected } = this.state;
    // const { classNamees } = this.props;

    return (

      <div className="background">
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
                style={{ textAlign: "center", fontFamily: 'Lusitana-Regular' }}
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
              <Fade when={isDisconnected}>
                {isDisconnected && <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle>
        Internet Disconnect — <strong>You are in offline mode!</strong>
                </Alert>}
              </Fade>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {/* body, */}
                {tracks && tracks.map((elem, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Link style={{ textDecoration: 'none' }} to={!isDisconnected ? `/lyrics/${elem.track.track_id}` : '#'} target="_blank">
                      <figure className="snip1543 hover" style={{ cursor: 'pointer' }}
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

            {/* <figure className="snip1543 hover"  style={{ cursor: 'pointer' }}>
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
