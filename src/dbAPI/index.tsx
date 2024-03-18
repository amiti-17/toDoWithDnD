import create from "@/mongoDB/queries/board/create";
import findAll from "@/mongoDB/queries/board/findAll";
import findOne from "@/mongoDB/queries/board/findOne";
import updateOneById from "@/mongoDB/queries/board/update";
import deleteOneById from "@/mongoDB/queries/board/delete";
import getInitial from "@/mongoDB/queries/board/getInitial";
import getLastUpdatedId from "@/mongoDB/queries/board/getLastUpdatedId";

const dbAPI = {
  create,
  getInitial,
  getLastUpdatedId,
  findAll,
  find: findOne,
  update: updateOneById,
  delete: deleteOneById,
};

export default dbAPI;
