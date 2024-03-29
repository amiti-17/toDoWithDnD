import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";

const findAll = async (): Promise<BoardType[]> => {
  try {
    const data = await fetch("/api/boards", {
      method: "GET",
      cache: "no-cache",
    });
    return (await data.json()).boards;
  } catch (error) {
    console.warn("We couldn't fetch initial board in getInitial", error);
    return [defaultBoard];
  }
};

export default findAll;
