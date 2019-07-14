"use strict";

const get = key => {
  const args = process.argv.slice(2);
  const index = args.indexOf(key);

  if (index !== -1 && typeof args[index + 1] !== 'undefined') {
    return args[index + 1];
  }
};

const is = key => {
  const args = process.argv.slice(2);
  const index = args.indexOf(key);
  return index !== -1;
};

const param = (index = 0) => {
  return process.argv[index + 2];
};

module.exports = {
  get,
  is,
  param
};