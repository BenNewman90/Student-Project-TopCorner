import React, { Component } from "react";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from "../Header/Header.js";
import Predictions from "../Predictions/Predictions.js";
import Footer from "../Footer/Footer.js";
import LoadingDiv from "./App.style.js";
const Loading = require("react-loading-animation");

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      teams: [],
      matches: []
    };
  }
  componentDidMount() {
    Promise.all([
      fetch("/api/users"),
      fetch("/api/matches"),
      fetch("/api/teams")
    ])
      .then(res => Promise.all(res.map(dataset => dataset.json())))
      .then(data => {
        this.setState({ users: data[0], matches: data[1], teams: data[2] });
        console.log(this.state.matches);
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.teams.length === 0) {
      return (
        <div>
          <Loading />
          <h1>gimme a sec...just finding the data</h1>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <Predictions users={this.state.users} matches={this.state.matches} />
          <Footer />
        </div>
      );
    }
  }
}

export default App;