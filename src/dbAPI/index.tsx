import create from "@/mongoDB/queries/board/create";
import deleteOneById from "@/mongoDB/queries/board/delete";
import findAll from "@/mongoDB/queries/board/findAll";
import findOne from "@/mongoDB/queries/board/findOne";
import getInitialBoard from "@/mongoDB/queries/board/getInitial";
import updateOneById from "@/mongoDB/queries/board/update";

const dbAPI = {
  create,
  getInitialBoard,
  findAll,
  find: findOne,
  update: updateOneById,
  delete: deleteOneById,
};

export default dbAPI;
