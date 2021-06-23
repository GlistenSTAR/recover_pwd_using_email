import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DynamicSelectGroupGroup = ({
  name,
  placeholder,
  error,
  info,
  onChange,
  disabled,
  options,
  required
}) => {
  return (
    <div className="form-group">
      <select
        className={classnames('form-control', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        disabled={disabled}
        required = {required}
        >
        {options.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </select>
    </div>
  );
};

DynamicSelectGroupGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

export default DynamicSelectGroupGroup;
