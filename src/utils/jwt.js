import jwt from "jsonwebtoken";
import { createNewSession } from "../models/session/SessionModel.js";
import { updateUser } from "../models/user/UserModel.js";

export const singAccessJWT = async (paylodad) => {
  const accessJWT = jwt.sign(paylodad, process.env.JWT_ACCESS, {
    expiresIn: "1m",
  });

  //store the key

  await createNewSession({
    associate: paylodad.email,
    token: accessJWT,
  });

  return accessJWT;
};

export const verifyAccessJWT = (tokne) => {
  try {
    const decoded = jwt.verify(tokne, process.env.JWT_ACCESS);

    return decoded;
  } catch (error) {
    return error.message.includes("jwt expired")
      ? "jwt expired"
      : error.message;
  }
};

// ===== refress

export const singRefreshJWT = async (paylodad) => {
  const refreshJWT = jwt.sign(paylodad, process.env.JWT_REFRESH, {
    expiresIn: "30d",
  });

  //store the key
  await updateUser(
    {
      email: paylodad.email,
    },
    { refreshJWT }
  );

  return refreshJWT;
};

export const verifyRefreshJWT = (tokne) => {
  try {
    const decoded = jwt.verify(tokne, process.env.JWT_REFRESH);
    return decoded;
  } catch (error) {
    return "logout";
  }
};
