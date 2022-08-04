import React from 'react';
import { useDispatch } from 'react-redux';

import { postReaction } from './store/postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const handleButton = () => {
    dispatch(postReaction({ id: post.id }));
  };

  return (
    <div className="postReactions">
      <button type="button" className="buttonReaction" onClick={handleButton}>
        <span className="buttonReaction__icon">{reactionEmoji.thumbsUp}</span>
        <span className="buttonReaction__count">{post.reactions}</span>
      </button>
    </div>
  );
};
