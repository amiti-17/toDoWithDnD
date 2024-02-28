import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";
import connectToMongoDb from "@/mongoDB";

export default async function create(): Promise<BoardType> {
  try {
    const data = await fetch("/api/boards", {
      method: "POST",
      body: JSON.stringify({
        toDo: [],
        inProgress: [],
        done: [],
      }),
    });
    return (await data.json()).board;
  } catch (error) {
    console.warn("We couldn't fetch initial board in getInitial", error);
    return defaultBoard;
  }
}
