import { BoardErrorType, BoardType } from "@/config/system/types/sampleBoard";

const getInitial = async (): Promise<
  BoardType | BoardErrorType | undefined
> =>{
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

export default getInitial;
