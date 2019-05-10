import React, { Fragment } from "react";

import Division from "./Division.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      standings: false,
    };
  }

  componentDidMount() {
		const socket = io('/', {path: '/mlbsocket/socket.io'});
    socket.on("FromAPI", data => {
      this.setState({ standings: data});
    });
  }

  render() {
    const { standings } = this.state;
    return (
      <div id="container">
        {standings ?
          <Fragment>
          <div id="AL">
            <Division league={standings[4]} division="ale" />
            <Division league={standings[5]} division="alc" />
            <Division league={standings[3]} division="alw" />
          </div>
          <div id="NL">
            <Division league={standings[2]} division="nle" />
            <Division league={standings[0]} division="nlc" />
            <Division league={standings[1]} division="nlw" />
          </div>
        </Fragment>
          : <p>loading...</p>}
        </div>
      );
    }
  }

  module.exports = App;
