import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    // let contentnav;
    // contentnav=(
    //   <li className="nav-item">
    //       <div className="dropdown">
    //         <button className="btn btn-primary dropdown-toggle btn btn-success" type="button" data-toggle="dropdown">NEW
    //         <span className="caret"></span></button>
    //         <ul className="dropdown-menu text-center">
    //           <li><a href="#">Less Than 2years</a></li>
    //           <li><a href="#">Greater Than 2years</a></li>
    //         </ul>
    //       </div>
    //       <button className="btn btn-success" to="/save">SAVE</button>
    //       <button className="btn btn-danger" to="/delete">DELETE</button>
    //       <button className="btn btn-warning" to="/pdf">PRINT PDF</button>
    //   </li>
    // )
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {/* { contentnav } */}
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Log out
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            {/* <i className="fas fa-sign-in-alt"/>{'    '} */}
            Sign In
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span>Expert</span> Invest
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  Navbar
);
