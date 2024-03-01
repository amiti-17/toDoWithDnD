import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";
import mongoose from "mongoose";

export default async function findOne(id: string): Promise<BoardType> {
  try {
    const data = await fetch(`/api/boards/${id}`, {
      method: "GET",
      cache: "no-cache",
    });
    const myData = await data.json();
    console.log(myData.board);
    return myData.board;
  } catch (error) {
    console.warn("We couldn't fetch initial board in findOne", error);
    throw error;
  }
}
