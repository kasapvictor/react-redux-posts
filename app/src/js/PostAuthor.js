import { useSelector } from 'react-redux';

export const PostAuthor = ({ id }) => {
  const author = useSelector((state) => state.users.find((user) => user.id === id));
  return author ? `${author.firstName} ${author.lastName}` : 'Unknown Author';
};
