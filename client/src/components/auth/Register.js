import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
// import { createUserInfo } from '../../actions/userinfoActions';
import TextFieldGroup from '../common/TextFieldGroup';
// import PasswordField from '../common/PasswordField';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      role:'user'
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // onClick = (e)=> {
  //   this.setState({ role: "teacher" });
  // }

  // onClick1 = (e)=> {
  //   this.setState({ role: "student" });
  // }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="landing">
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
              <div className="register container">
                <div className="logo text-center">
                  <img src="/img/logo.png" alt="logo"/>
                </div>
                <br/>
                <p className="text-center">
                  Create your new account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="First Name"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.onChange}
                    error={errors.first_name}
                  />
                  <TextFieldGroup
                    placeholder="Last Name"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.onChange}
                    error={errors.last_name}
                  />
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  {/* <PasswordField
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  /> */}
                  <TextFieldGroup
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  {/* <div align="center" className="checkgroup">
                    <input type="checkbox" name="teacher" defaultChecked={false} onClick={this.onClick}/> <span className="mr-5">Teacher</span>
                    <input type="checkbox" name="student" defaultChecked={false} onClick={this.onClick1}/> <span>Student</span>
                  </div> */}
                  <input type="submit" value="Regester" className="btn btn-primary btn-block mt-4 mb-5"/>
                  <div className="text-center">
                    Already have an account? &nbsp;
                    <Link to="/login">
                        Login
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
