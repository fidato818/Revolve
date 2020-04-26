import React, { Component } from "react";
import Routes from "./config/routes";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Permanent Marker", "sans-serif"]
  }
});

export default class App extends Component {
  render() {
    return <Routes />;
  }
}
