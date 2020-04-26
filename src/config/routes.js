import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Search from "../pages/Search/Search";
import Lyrics from "../pages/Lyrics/Lyrics";
import ScrollToTop from "react-router-scroll-top";
class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      auth: false,
      anchorEl: null,
      displayEmail: "",
      open: false
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <ScrollToTop>
            <Route path="/" exact component={Search} />
            <Route path="/lyrics/:id" component={Lyrics} />
          </ScrollToTop>
        </Switch>
      </Router>
    );
  }
}
Routes.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(Routes);

// const mapDispatchToProps = dispatch => {

//   return {
//     store_user: (userlogin) => dispatch(update_user(userlogin)),
//     addFoodInCart: (userlogin) => dispatch(addToCart(userlogin)),
//     removeFoodInCart: (userlogin) => dispatch(removeTOCart(userlogin)),

//     logout_user: () => dispatch(remove_user()),
//   }
// }
// export default withStyles(styles)(Login);
export default Routes;
