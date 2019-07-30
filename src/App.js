import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Register from './stories/auth/Register';
import NavigationBar from './stories/NavigationBar';
import Home from './stories/Home';
import LogIn from './stories/auth/LogIn';
import { Auth } from 'aws-amplify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit);


class App extends Component{
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch(error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }
  render(){
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return(
      !this.state.isAuthenticating &&
      <div className = "App">
        <Router>
          <div>
            <NavigationBar auth = {authProps}/>
            <Switch>
              <Route exact path = "/" component = {Home} />
              <Route exact path = "/register" component = {Register} />
              <Route exact path = "/login" component = {LogIn} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
