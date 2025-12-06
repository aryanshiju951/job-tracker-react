export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const required = (val) => (val && String(val).trim().length > 0);

export const minLength = (val, n) => (val && String(val).length >= n);
