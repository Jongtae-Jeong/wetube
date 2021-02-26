import express from "express";
import { getChangePassword, getEditProfile, postChangePassword, postEditProfile, userDetail, users } from "../controller/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

import routes from "../routers";

const userRouter = express.Router();


userRouter.get(routes.editProfile,onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile,onlyPrivate,uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword,onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword,onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);


userRouter.get(routes.users, users);

export default userRouter;