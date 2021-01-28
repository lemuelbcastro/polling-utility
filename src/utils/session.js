const key = process.env.npm_package_name;
const session = {
  create: (data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  get: () => {
    const value = localStorage.getItem(key);

    return value && JSON.parse(value);
  },
  destroy: () => {
    localStorage.removeItem(key);
  },
};

export default session;
