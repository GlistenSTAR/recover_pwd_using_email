import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import "./auth.css";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';
// import queryString from 'query-string';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      sendingEmail: false,
      id: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.id>0){
      this.setState({id:this.props.match.params.id});
    }
    if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentWillMount(){
    if(this.props.match.params.id){
      toast("Successfully verified. Please come via login");
    }
    if(this.props.errors.change_pass)
    {
      toast(this.props.errors.change_pass);
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      id: this.state.id
    };
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    let verifyMail='';
    if(errors.state_email){
      toast(errors.state_email);
      // verifyMail = <Link to="/verifyEmail">
      //   &nbsp; Verify email?
      // </Link>
    }
    return (
      <div className="landing">
        <ToastContainer/>
        <div className="dark-overlay">
          <div className="row">
            <div className="welcome container text-center">
                <h1>
                    Welcome to Expert Invest
                </h1>
                <hr/>
                <p>
                  Powerful and professional admin template for Web Applications, CRM, CMS, Admin Panels and more.
                </p>
            </div>
            <div className="login container">
            <div className="logo text-center">
              <img src="/img/logo.png"  alt="logo"/>
            </div>
            <br/>
            <p className="text-center">
              Log in to your account
            </p>
            <form  noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <button type="submit" className="btn btn-primary btn-block">
                {this.state.sendingEmail 
                  ? <Spinner size='lg' spinning='spinning' /> 
                  : "Let's Go!"
                }
              </button>
              <br/>
              <div>
                <Link to="/forgot">
                  &nbsp; Forgot password?
                </Link>
                { verifyMail }
              </div>
              <br/>
              <div className="text-center">
                Don't you have a account? &nbsp;
                <Link to="/register">
                    Register
                </Link>
              </div>
            </form>
          </div>
          </div>
          </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
