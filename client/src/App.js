import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
// user case
import PrivateRoute from './components/common/PrivateRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Forgot from './components/auth/forgotPassword';
import VerifyEmail from './components/auth/VerifyEmail';
import ResetPass from './components/auth/resetPassword';
import Dashboard from './components/dashboard/Dashboard';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// localStorage.removeItem('jwtToken');
if (localStorage.jwtToken) {
  // Set auth token header auth
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime)
  {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // Redirect to login
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/verifyEmail" component={VerifyEmail} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/confirmed/:id" component={Login} />
            <Route exact path="/confirmedpass/:id" component={ResetPass} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            {/* <Redirect from='*' to='/'/> */}
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
