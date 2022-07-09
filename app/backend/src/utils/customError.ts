// https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript

export default class CustomError extends Error {
  private status: number;
  constructor(status: number, msg: string) {
    super(msg);
    this.status = status;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
