export default async (value, regular, errorWarning) => {
  if (!regular.test(value)) {
    return Promise.reject(errorWarning);
  }
};
