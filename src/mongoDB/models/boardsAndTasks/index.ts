import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const boardSchema = new Schema(
  {
    toDo: [taskSchema],
    inProgress: [taskSchema],
    done: [taskSchema],
  },
  {
    timestamps: true,
  }
);

export const Board =
  mongoose.models.Board || mongoose.model("Board", boardSchema);
