import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

function CustomLink({ href, text, color, title }) {
  return (
    <div>
      <Link href={href}>
        <a href={href} title={title}>
          {text}
        </a>
      </Link>
      <style jsx>
        {`
          a {
            color: ${color};
            text-decoration: none;
          }
        `}
      </style>
    </div>
  );
}

CustomLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
};

CustomLink.defaultProps = {
  text: '',
  color: '#fff',
  title: '',
};

export default CustomLink;
