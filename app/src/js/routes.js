export const routes = {
  home: '/',
  notFound: '*',
  about: 'about',
  post: (id = null) => ['/posts', `${id ?? ':postId'}`].join('/'),
  postEdit: (id = null) => ['/edit', `${id ?? ':postId'}`].join('/'),
};
