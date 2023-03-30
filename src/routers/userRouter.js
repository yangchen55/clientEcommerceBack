import express from "express"
const router = express.Router()
import { v4 as uuidv4 } from 'uuid';
import { loginValidation } from "../middlewares/joiMiddleware.js";
import { createNewUser, findUser, updateUser } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { singAccessJWT, singRefreshJWT } from "../utils/jwt.js";
import { emailVerifiedNotification, newAccountEmailVerificationEmail, sendEmail } from "../utils/nodemailer.js";

// client user registration 
router.post("/register", async (req, res, next) => {
    try {
        req.body.password = hashPassword(req.body.password);
        req.body.emailVerificationCode = uuidv4();
        const result = await createNewUser(req.body)
        if (result?._id) {
            const uniqueLink = `${process.env.FRONTEND_ROOT_URL}/verify?c=${result.emailVerificationCode}&email=${result.email}`;
            const link = await newAccountEmailVerificationEmail(uniqueLink, result);
            res.json({
                status: "success",
                message:
                    "We have send a verification email",
                link
            });

            return
        }
        res.json({
            status: "error",
            message: "Error, Unable to create a new User",
        });

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message =
                "There is already account exist associated with this email";
            error.errorCode = 200;
        }
        next(error);


    }
}
)

//  user email verification
router.post("/verify", async (req, res, next) => {
    try {
        // chek if the combination of email and code exist in db if so set the status active and code to "" in the db, also update is email verified to true

        const obj = {
            status: "active",
            isEmailVerified: true,
            emailVerificationCode: "",
        };

        const user = await updateUser(req.body, obj);

        if (user?._id) {
            //send email notification
            emailVerifiedNotification(user);
            res.json({
                status: "success",
                message: "Your account has been verified. You may login now",
            });

            return;
        }

        res.json({
            status: "error",
            message: "The link is invalid or expired.",
        });
    } catch (error) {
        next(error);
    }
});


//user login
router.post("/login", loginValidation, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const newcustomer = {
            email: email,
            password: password
        }
        const user = await findUser({ email })
        if (user?._id) {
            if (!user?.isEmailVerified) {
                return res.json({
                    status: "error",
                    message:
                        "You email is not veirfied. Check your email and follow the instruction and verify your account.",
                    user,
                })
            }
            const isPassMatch = comparePassword(password, user.password);
            if (isPassMatch) {
                user.password = undefined;
                user.__v = undefined;
                res.json({
                    status: "success",
                    message: "Login success fully",
                    toknes: {
                        accessJWT: await singAccessJWT({ email }),
                        refreshJWT: await singRefreshJWT({ email }),
                    },
                    user
                })

            } else {
                res.json({
                    status: "error",
                    message: "Incorrect password",

                })

            }

        } else {
            res.json({
                status: "error",
                message: "please register to become new customer",
                newcustomer
            });
        }


    } catch (error) {
        next(error)
    }

})


export default router;