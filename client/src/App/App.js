import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import PredictionsPage from "../pages/PredictionsPage/PredictionsPage";
import HomePage from "../pages/HomePage/HomePage.js";
import LoginPage from "../pages/LoginPage/LoginPage.js";
import SignupPage from "../pages/SignupPage/SignupPage.js";
import ProfilePage from "../pages/ProfilePage/ProfilePage.js";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.js";
import PasswordRecoveryPage from "../pages/PasswordRecoveryPage/PasswordRecoveryPage.js";
import Loading from "react-loading-animation";
import validateCookieTF from "../helpers/validateCookie";
import handleChange from "../helpers/handleChange";
import handleLogin from "../helpers/handleLogin";
import handleRegister from "../helpers/handleRegister";
import handleLogout from "../helpers/handleLogout";
import handlePostComment from "../helpers/handlePostComment";
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      teams: [],
      matches: [],
      comments: [],
      username: "",
      password: "",
      newUsername: "",
      newEmail: "",
      newPassword: "",
      newPasswordConfirm: "",
      signupError: "",
      signupSuccess: "",
      disabledProp: true,
      loginError: "",
      auth: false,
      authUser: null,
      dropDown: false,
      currentUserId: 1,
      currentComment: ""
    };
    this.handlePostComment = handlePostComment.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleLogin = handleLogin.bind(this);
    this.handleRegister = handleRegister.bind(this);
    this.handleLogout = handleLogout.bind(this);
    this.validateCookieTF = validateCookieTF.bind(this);
    this.dropDownView = this.dropDownView.bind(this);
  }

  handlePostComment;

  handleChange;

  handleLogout;

  handleLogin;

  handleRegister;

  dropDownView() {
    if (this.state.dropDown === false) {
      this.setState({ dropDown: true });
    } else if (this.state.dropDown === true) {
      this.setState({ dropDown: false });
    }
  }

  componentDidMount() {
    validateCookieTF(this);
    Promise.all([
      fetch("/api/users"),
      fetch("/api/matches"),
      fetch("/api/teams"),
      fetch("/api/comments")
    ])
      .then(res => Promise.all(res.map(dataset => dataset.json())))
      .then(data => {
        this.setState({
          users: data[0],
          matches: data[1],
          teams: data[2],
          comments: data[3]
        });
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
        <Router>
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route
              path="/login"
              render={() =>
                !this.state.auth ? (
                  <LoginPage
                    handleChange={this.handleChange}
                    handleLogin={this.handleLogin}
                    username={this.state.username}
                    password={this.state.password}
                    loginError={this.state.loginError}
                  />
                ) : (
                  <Redirect to="/predictions" />
                )
              }
            />
            <Route
              path="/signup"
              render={() =>
                !this.state.auth ? (
                  <SignupPage
                    handleChange={this.handleChange}
                    handleRegister={this.handleRegister}
                    newUsername={this.state.newUsername}
                    newPassword={this.state.newPassword}
                    newPasswordConfirm={this.state.newPasswordConfirm}
                    newEmail={this.state.newEmail}
                    signupError={this.state.signupError}
                    disabledProp={this.state.disabledProp}
                    signupSuccess={this.state.signupSuccess}
                  />
                ) : (
                  <Redirect to="/predictions" />
                )
              }
            />
            <Route path="/signup" render={() => <SignupPage />} />
            <Route
              path="/profile"
              render={() =>
                this.state.auth ? (
                  <ProfilePage
                    users={this.state.users}
                    authUser={this.state.authUser}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              path="/passwordRecovery"
              render={() => <PasswordRecoveryPage />}
            />
            <Route
              path="/predictions"
              render={() =>
                this.state.auth ? (
                  <PredictionsPage
                    handleChange={this.handleChange}
                    users={this.state.users}
                    matches={this.state.matches}
                    handleLogout={this.handleLogout}
                    authUser={this.state.authUser}
                    dropDown={this.state.dropDown}
                    dropDownView={this.dropDownView}
                    handlePostComment={this.handlePostComment}
                    comments={this.state.comments}
                    currentComment={this.state.currentComment}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      );
    }
  }
}
export default App;
