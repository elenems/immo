import React from 'react';
import PropTypes from 'prop-types';

function Button({
  text,
  callback,
  background,
  title,
}) {
  return (
    <button
      title={title}
      type="button"
      onClick={callback}
    >
      {text}
      <style jsx>
        {`
          background-color: ${background};
          font-size: 16px;
          border-radius: 2px;
          letter-spacing: 0.05em;
          padding: 8px 16px;
          border: none;
          color: #fff;
        `}
      </style>
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  callback: PropTypes.func.isRequired,
  background: PropTypes.string,
  title: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  background: '#d81b60',
  title: '',
};

export default Button;
