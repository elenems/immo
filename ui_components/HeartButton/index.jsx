import React from 'react';
import PropTypes from 'prop-types';
import { TiHeartFullOutline } from 'react-icons/ti';
import { connect } from 'react-redux';
import {
  hideCardAction,
  showCardAction,
  likePhotoAction,
  unlikePhotoAction,
} from '../../store/actions';
import { dispatchShowCard } from '../../utils';

function HeartButton({
  id,
  isAuthenticated,
  showCard,
  hideCard,
  isInProcess,
  user,
  likePhoto,
  unlikePhoto,
  color,
}) {
  const isLiked = id in user.favourites;
  return (
    <button
      title={isLiked ? 'Unlike' : 'Like'}
      onClick={(e) => {
        e.preventDefault();
        if (isAuthenticated) {
          const payload = {
            userId: user.id,
            photoId: id,
          };
          if (!isLiked) {
            likePhoto(payload);
          } else {
            unlikePhoto(payload);
          }
        } else {
          dispatchShowCard(
            showCard,
            hideCard,
            'Sign in to like',
            'fail',
            isInProcess,
          );
        }
      }}
      type="button"
    >
      <TiHeartFullOutline />
      <style jsx>
        {`
          button {
            background: none;
            border: none;
            color: ${isLiked ? '#d81b60' : color};
            font-size: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            transition: transform 0.25s;
          }

          button:hover {
            transform: scale(1.2);
          }
        `}
      </style>
    </button>
  );
}

HeartButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  showCard: PropTypes.func.isRequired,
  hideCard: PropTypes.func.isRequired,
  isInProcess: PropTypes.bool.isRequired,
  color: PropTypes.string,
  likePhoto: PropTypes.func.isRequired,
  unlikePhoto: PropTypes.func.isRequired,
};

HeartButton.defaultProps = {
  color: '#fff',
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isInProcess: state.ui.isInProcess,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  showCard: (payload) => dispatch(showCardAction(payload)),
  hideCard: () => dispatch(hideCardAction()),
  likePhoto: (payload) => dispatch(likePhotoAction(payload)),
  unlikePhoto: (payload) => dispatch(unlikePhotoAction(payload)),
});

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(HeartButton),
);
