import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";

export default async function getInitial(): Promise<BoardType> {
  try {
    const data = await fetch("/api/boards/getInitial", {
      method: "GET",
    });
    return (await data.json()).board;
  } catch (error) {
    console.warn("We couldn't fetch initial board in getInitial", error);
    return defaultBoard;
  }
}