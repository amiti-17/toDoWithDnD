import errorConstants from "@/config/system/errorConstants";
import CustomError from ".";

type ConnectionToDbErrorType = "positive" | "negative" | undefined;

export default class ConnectionToDbError extends CustomError {
  constructor(message: string, type: ConnectionToDbErrorType) {
    super(message);
    this.type = type;
    this.name = errorConstants.connectionToDbError;
  }
  type?: ConnectionToDbErrorType;
  stack?: string | undefined;
  cause?: unknown;
}
