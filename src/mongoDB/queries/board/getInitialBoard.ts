import { defaultBoard } from "@/config/system/types/sampleBoard";

export default async function getInitialBoard() {
  try {
    const data = await fetch("/api/boards", {
      method: "GET",
    });
    return (await data.json()).boards[0];
  } catch (error) {
    console.log("We couldn't fetch initial board in getInitialBoard", error);
    return defaultBoard;
  }
}
