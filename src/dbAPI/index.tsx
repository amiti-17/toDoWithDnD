import create from "@/mongoDB/queries/board/create";
import deleteOneById from "@/mongoDB/queries/board/delete";
import findAll from "@/mongoDB/queries/board/findAll";
import findOne from "@/mongoDB/queries/board/findOne";
import getInitial from "@/mongoDB/queries/board/getInitial";
import updateOneById from "@/mongoDB/queries/board/update";

const dbAPI = {
  create,
  getInitial,
  findAll,
  find: findOne,
  update: updateOneById,
  delete: deleteOneById,
  // task: {
  // create,
  // find: findOne,
  // update: updateOneById,
  // delete: deleteOneById,
  // },
};

export default dbAPI;
