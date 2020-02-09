import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdDone, MdErrorOutline } from 'react-icons/md';

function Card({ text, type }) {
  return (
    <div className={text ? 'card' : ''}>
      {type === 'success' ? <MdDone /> : <MdErrorOutline />}
      <p>{text}</p>
      <style jsx>
        {`
          div {
            display: ${text ? 'flex' : 'none'};
            position: fixed;
            left: 0;
            margin: auto;
            right: 0;
            display: flex;
            align-items: center;
            z-index: 1000;
            padding: 12px 12px;
            width: 320px;
            background: #070943;
            font-weight: 600;
            color: #d81b60;
            font-size: 36px;
            top: -60px;
          }

          div p {
            color: white;
            font-size: 16px;
            margin-left: 8px;
          }
        `}
      </style>
    </div>
  );
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  text: state.ui.text,
  type: state.ui.type,
});

export default connect(mapStateToProps)(Card);
