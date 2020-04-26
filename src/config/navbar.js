import React from "react";
import {
    Typography,
    Toolbar,
    AppBar,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
        color: "White",
        fontFamily: 'Lusitana-Regular'
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
class Appbar extends React.Component {
    constructor() {
        super();
        this.state = { trackName: "", artist: "", tracks: [] };

    }


    render() {      
        const { classes } = this.props;
        // console.log(trackName);
      
        return (
            <div>
                <div className={classes.root}>
                    <AppBar
                        style={{ background: "#1e9214" }}
                        // color={'#1e9214'}
                        position="fixed"
                        className={classes.appBar}
                    >
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Lyrics Search
                </Typography>
                        </Toolbar>
                    </AppBar>
                </div>

            </div>
        );
    }
}
export default withStyles(styles)(Appbar);
