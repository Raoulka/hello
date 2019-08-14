import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Register from './stories/auth/Register';
import NavigationBar from './stories/NavigationBar';
import Home from './stories/Home';
import LogIn from './stories/auth/LogIn';
import ForgotPassword from './stories/auth/ForgotPassword';
import PasswordVerification from './stories/auth/PasswordVerification';
import ChangePassword from './stories/auth/ChangePassword';
import ConfirmPasswordChange from './stories/auth/ConfirmPasswordChange';
import { Auth } from 'aws-amplify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Welcome from './stories/auth/Welcome';
library.add(faEdit);

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    token: null,
    user: null
  };

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = user => {
    this.setState({ user: user });
  };

  setToken = token => {
    this.setState({ token: token });
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      console.log(session.getIdToken().getJwtToken());
      // console.log(sessio)
      this.setUser(user);
      this.setToken(session.getIdToken().getJwtToken());
    } catch (error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
    this.setState({ isAuthenticating: false });
  }
  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };
    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <Router>
            <div>
              <NavigationBar auth={authProps} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Home {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/register"
                  render={props => <Register {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/login"
                  render={props => <LogIn {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/welcome"
                  render={props => <Welcome {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/forgotpassword"
                  render={props => (
                    <ForgotPassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/passwordverification"
                  render={props => (
                    <PasswordVerification {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepassword"
                  render={props => (
                    <ChangePassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/confirmPasswordChange"
                  render={props => (
                    <ConfirmPasswordChange {...props} auth={authProps} />
                  )}
                />
              </Switch>
            </div>
          </Router>
        </div>
      )
    );
  }
}

export default App;
