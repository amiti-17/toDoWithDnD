import { BoardType } from "@/config/system/types/sampleBoard";

const findOne = async (id: string): Promise<BoardType> => {
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
};

export default findOne;
