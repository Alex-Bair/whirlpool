/* eslint-disable no-param-reassign */
function convertDbTimetoDateObj(databaseTime) {
  databaseTime[10] = 'T';
  databaseTime = `${databaseTime.substring(0, 23)}Z`;
  return new Date(databaseTime);
}

class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

module.exports = {
  convertDbTimetoDateObj,
  HttpError,
};
