import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
class PasswordField extends React.Component{
    state = {
      type: 'text',
    }
  
  
    handleClick = () => this.setState(({type}) => ({
      type: type === 'text' ? 'password' : 'text'
    }))
  
  
    render() {
      const { label } = this.props
      const  type = this.state.type;
      return (
        <div className="form-group">
          <input 
            type={type}
            className={classnames('form-control', {
            'is-invalid': this.props.error
            })}
            placeholder={this.props.placeholder}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            min = {this.props.min}
            max = {this.props.max}
            required = {true}
          />
          <span className="password__show" onClick={this.handleClick}>{this.state.type === 'text' ? 'Hide' : 'Show'}</span>
            {this.props.info && <small className="form-text text-muted">{this.props.info}</small>}
            {this.props.error && <div className="invalid-feedback">{this.props.error}</div>}
        </div>
      )
    }
  }
  PasswordField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
  };
  
  export default PasswordField;