import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const TimeAgo = ({ timestamp = null }) => {
  const date = parseISO(timestamp);
  const timePeriod = formatDistanceToNow(date);

  return <>{timestamp ? `${timePeriod} ago` : ''}</>;
};
