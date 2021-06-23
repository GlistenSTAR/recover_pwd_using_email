import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import "./auth.css";
import { Link } from 'react-router-dom';
import { changePassword } from '../../actions/authActions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.change_pass) {
        this.props.history.push('/login');
    }
    if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
}
componentWillMount(){
    if(this.props.match.params.id){
        toast("Email verified, please enroll new password");
    }
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.changePassword({id: this.props.match.params.id, password: this.state.password});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="landing">
          <ToastContainer/>
      <div className="dark-overlay">
          <div className="forgot container">
            <h1 className="display-5 text-center">New Password</h1>
            <br/>
            <p className="text-center">
                Please enter your new password.
            </p>
            <form  noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Enter your password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <input type="submit" value="Submit" className="btn btn-primary btn-block" />
              <br/>
              <div className="text-center text-light">
                <Link to="/login">
                    Back to Login
                </Link>
              </div>
            </form>
          </div>
          </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ changePassword })(ResetPassword);
