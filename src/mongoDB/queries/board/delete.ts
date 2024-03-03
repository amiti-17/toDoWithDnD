import { BoardType } from "@/config/system/types/sampleBoard";

const deleteOneById = async (id: string): Promise<BoardType> => {
  try {
    const data = await fetch(`/api/boards?id=${id}`, {
      method: "DELETE",
      cache: "no-cache",
    });
    if (data.status === 405) {
      throw new Error("Operation not allowed");
    }
    return (await data.json()).board;
  } catch (error) {
    const errorMessage = {
      title: "Error in Delete function in try to delete with id: ",
      id,
      error,
    };
    console.warn(errorMessage);
    throw error;
  }
};

export default deleteOneById;
