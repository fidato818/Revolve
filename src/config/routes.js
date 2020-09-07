import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Search from "../pages/Search/Search";
import Lyrics from "../pages/Lyrics/Lyrics";
import ScrollToTop from "react-router-scroll-top";
class Routes extends React.Component {
 

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

export default Routes;
