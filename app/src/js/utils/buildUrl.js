export const buildUrl = (base, email, status) => {
  const url = new URL(base);

  url.searchParams.set('email', email);
  url.searchParams.set('status', status);

  return url.href;
};
