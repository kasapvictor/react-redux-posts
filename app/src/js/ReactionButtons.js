import React from 'react';
import { useDispatch } from 'react-redux';

import { postReaction, resetUpdateStatus, updatePost } from './store/postsSlice';

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
    // console.log(post.reactions);
    dispatch(
      updatePost({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
        tags: post.tags,
        reactions: post.reactions,
      }),
    );

    // TODO СБРОСИТЬ СТАТУС НА idle
    setTimeout(() => {
      dispatch(resetUpdateStatus());
    }, 500);
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
