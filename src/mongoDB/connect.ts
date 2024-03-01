import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("process.env is not set...");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongodb");
  } catch (error) {
    console.error("error in connection to mongoDb", error);
  }
};

export default connectToMongoDb;
