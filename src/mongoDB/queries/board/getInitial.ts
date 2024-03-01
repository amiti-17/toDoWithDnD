import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";

export default async function getInitial(): Promise<BoardType | undefined> {
  try {
    const data = await fetch("/api/boards/getInitial", {
      method: "GET",
      cache: "no-cache",
    });
    return (await data.json()).board;
  } catch (error) {
    console.warn("We couldn't fetch initial board in getInitial", error);
    return undefined;
  }
}
