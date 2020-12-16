import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import $ from 'jquery';
import { logoutUser } from '../../actions/authActions';
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
    }
  }
  componentDidMount = async()=>{
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillMount(){
  }
  onChange = (e) => {
  }
  render() {
      return (
        <div>
          <Navbar/>
          <Footer/>
        </div>
      );
    }
  }

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  userinfo: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  sidemaps: state.sidemaps,
  errors: state.errors,
  userinfo: state.userinfo
});

export default connect(mapStateToProps,{logoutUser})(
  Dashboard
);