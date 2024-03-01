import { BoardType } from "@/config/system/types/sampleBoard";

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
    console.warn("We couldn't fetch initial board in getInitial", error);
    throw error;
  }
}
