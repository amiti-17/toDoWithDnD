import errorConstants from "@/config/system/errorConstants";

export default class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = errorConstants.customError;
  }
  stack?: string | undefined;
  cause?: unknown;
}
