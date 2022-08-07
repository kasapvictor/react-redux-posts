import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetUpdateStatus, updatePost, postUpdatingId } from '../../store';
import { Spinner } from '../../components/Spinner';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const postStatusUpdate = useSelector((state) => state.posts.statusUpdate);
  const postUpdating = useSelector((state) => state.posts.postUpdatingId);

  const handleButton = async () => {
    dispatch(postUpdatingId(post.id));

    await dispatch(
      updatePost({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
        tags: post.tags,
        reactions: post.reactions + 1,
      }),
    );

    dispatch(resetUpdateStatus());
  };

  return (
    <div className="postReactions">
      <button type="button" className="buttonReaction" onClick={handleButton}>
        <span className="buttonReaction__icon">{reactionEmoji.thumbsUp}</span>

        <div className="buttonReaction__counter">
          {postUpdating === post.id && (
            <>
              {postStatusUpdate === 'failed' && <div>&times;</div>}

              {postStatusUpdate === 'loading' && (
                <div className="buttonReaction__spinner">
                  <Spinner size="1rem" />
                </div>
              )}

              {postStatusUpdate === 'idle' && <span className="buttonReaction__count">{post.reactions}</span>}
            </>
          )}

          {postUpdating !== post.id && <span className="buttonReaction__count">{post.reactions}</span>}
        </div>
      </button>
    </div>
  );
};
