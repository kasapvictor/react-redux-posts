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

  const handleButton = (name) => () => {
    dispatch(postReaction({ id: post.id, reaction: name }));
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
      <button key={name} type="button" className="buttonReaction" onClick={handleButton(name)}>
        <span className="buttonReaction__icon">{emoji}</span>
        <span className="buttonReaction__count">{post.reactions[name]}</span>
      </button>
  ));

  return <div className="postReactions">{reactionButtons}</div>;
};
