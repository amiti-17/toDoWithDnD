import { BoardType } from "@/config/system/types/sampleBoard";

const getLastUpdatedId = async () => {
  try {
    const data = await fetch(`/api/boards/getLastUpdated`, {
      method: "GET",
      cache: "no-cache",
    });
    const myData = (await data.json()) as { boards: BoardType[] };
    if (myData.boards) {
      console.log(myData.boards);
      return myData.boards.map((board) => board._id.toString());
    }
    return undefined;
  } catch (error) {
    console.warn("We couldn't fetch initial board in findOne", error);
    throw error;
  }
};

export default getLastUpdatedId;
