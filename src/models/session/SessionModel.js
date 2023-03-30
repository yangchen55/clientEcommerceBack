import SessionSchema from "./SessionSchema.js";

export const createNewSession = (obj) => {
  return SessionSchema(obj).save();
};

//delete sessions
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
