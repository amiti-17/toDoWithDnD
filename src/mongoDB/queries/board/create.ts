import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";

export default async function create(): Promise<BoardType> {
  try {
    const data = await fetch("/api/boards", {
      method: "POST",
      cache: "no-cache",
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
