export const getDate = () => {
  return new Intl.DateTimeFormat('pl').format(new Date());
};
