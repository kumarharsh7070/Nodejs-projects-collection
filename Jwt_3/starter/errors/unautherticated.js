const CustomApiError = require('./custom-error')
const { StatusCodes } = require('http-status-codes');

class UnauthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statuCode=StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthenticatedError
