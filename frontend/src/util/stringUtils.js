function capitalise(str) {
  return `${str.substring(0, 1).toUpperCase()}${str
    .substring(1)
    .toLowerCase()}`;
}

module.exports = { capitalise };
