import CustomError from "@/CustomError";
import ConnectionToDbError from "@/CustomError/ConnectionToDbError";
import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new CustomError("process.env is not set...");
    }
    if (
      mongoose.connection.readyState === 1 ||
      mongoose.connection.readyState === 2
    ) {
      throw new ConnectionToDbError(
        "connecting to MongoDB has already completed",
        "positive"
      );
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongodb");
  } catch (error) {
    if (error instanceof ConnectionToDbError) {
      if (error.type === "negative") throw error;
    } else throw error;
  }
};

export default connectToMongoDb;
