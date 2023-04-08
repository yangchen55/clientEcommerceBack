
import { findUser } from "../models/user/UserModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";


export const isAuth = async (req, res, next) => {
  try {
    ///all the authorization code process
    // get jwt from header
    const { authorization } = req.headers;

    //check jwt validation and in db
    const decoded = verifyAccessJWT(authorization);

    if (decoded?.email) {
      //check if the payload in jwt matches in our admin user
      const user = await findUser({
        email: decoded.email,
      });
      console.log(user, "jwt")

      if (user?._id) {
        req.userInfo = user;
        return next();
      }
    }

    // then authorize = true

    res.status(403).json({
      statu: "error",
      message: decoded,
    });
  } catch (error) {
    next(error);
  }
};

export const isValidAccessJWT = async (req, res, next) => {
  try {
    ///all the authorization code process
    // get jwt from header
    const { authorization } = req.headers;

    //check jwt validation and in db
    const decoded = verifyAccessJWT(authorization);

    if (decoded?.email) {
      //check if the payload in jwt matches in our admin user
      const user = await findUser({
        email: decoded.email,
      });

      if (user?._id) {
        req.userInfo = user;
        return next();
      }
    }

    // then authorize = true

    res.status(403).json({
      statu: "error",
      message: decoded,
    });
  } catch (error) {
    next(error);
  }
};
