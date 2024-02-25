import mongoose from "mongoose"

export type TaskType = {
  title: string,
  description: string,
  _id: mongoose.Types.ObjectId,
}

export type BoardType = {
  toDo: TaskType[],
  inProgress: TaskType[],
  done: TaskType[],
  _id: mongoose.Types.ObjectId,
}

export const sampleBoard: BoardType = {
  toDo: [],
  inProgress: [],
  done: [],
  _id: new mongoose.Types.ObjectId('000000000000000000000000'),
}

export const defaultBoard: BoardType = {
  toDo: [{
    title: "It's default border",
    description: "You see this, because you don't have any other boards...",
    _id: new mongoose.Types.ObjectId('000000000000000000000010'),
  }],
  inProgress: [{
    title: "You can DnD",
    description: "You can DnD from other columns into this, to mark them as in progress...",
    _id: new mongoose.Types.ObjectId('000000000000000000000011'),
  }],
  done: [{
    title: "It's the last column",
    description: "Here you can see task that you have already done. I will store here until you delete it, or one month is gone.",
    _id: new mongoose.Types.ObjectId('000000000000000000000100'),
  }],
  _id: new mongoose.Types.ObjectId('000000000000000000000001'),
}
