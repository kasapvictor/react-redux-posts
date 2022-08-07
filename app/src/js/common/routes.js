export const routes = {
  home: '/',
  notFound: '*',
  about: 'about',
  users: 'users',
  post: (id = null) => ['/posts', `${id ?? ':postId'}`].join('/'),
  postEdit: (id = null) => ['/edit', `${id ?? ':postId'}`].join('/'),
  user: (id = null) => ['/users', `${id ?? ':userId'}`].join('/'),
};
