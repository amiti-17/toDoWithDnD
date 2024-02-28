import { BoardType } from "@/config/system/types/sampleBoard";
import mongoose from "mongoose";

export default function updateOneById(
  id: mongoose.Types.ObjectId,
  updatedBoard: BoardType
): Promise<BoardType> {
  try {
    return fetch(`/api/boards/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedBoard),
    })
      .then((res) => res.json())
      .then((res) => res.board);
  } catch (error) {
    console.warn("Error occurred in Update board: ", error);
    throw error;
  }
}