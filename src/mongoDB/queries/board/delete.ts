import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";
import mongoose from "mongoose";

export default async function deleteOneById(
  id: mongoose.Types.ObjectId
): Promise<BoardType> {
  try {
    const data = await fetch(`/api/boards?id=${id}`, {
      method: "DELETE",
    });
    if (data.status === 405) {
      throw new Error("Operation not allowed");
    }
    return (await data.json()).board;
  } catch (error) {
    const errorMessage = {
      title: "Error in Delete function in try to delete with id: ",
      id,
      error,
    };
    console.warn(errorMessage);
    throw error;
  }
}
