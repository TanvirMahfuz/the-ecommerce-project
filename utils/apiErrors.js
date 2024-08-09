class ApiError extends Error {
  constructor(status, name, message) {
    super(message);
    this.status = status ? status : 500;
    this.name = name;
    this.stack = "";
  }
}
module.exports = ApiError;
