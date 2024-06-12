const idIncrement = (data) => {
  if (data.length !== 0) return data.at(-1).id + 1;
  return 1;
};

module.exports = {
  idIncrement,
};
