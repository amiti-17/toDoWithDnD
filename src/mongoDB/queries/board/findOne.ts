import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";
import mongoose from "mongoose";

export default async function findOne(
  id: mongoose.Types.ObjectId
): Promise<BoardType> {
  try {
    const data = await fetch(`/api/boards/${id}`, {
      method: "GET",
    });
    return (await data.json()).board;
  } catch (error) {
    console.warn("We couldn't fetch initial board in getInitial", error);
    throw error;
  }
}
