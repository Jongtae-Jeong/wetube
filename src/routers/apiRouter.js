import express from "express";
import { postAddcomment, postRegisterView } from "../controller/videoController";
import routes from "../routers"

const apiRouter =express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddcomment);

export default apiRouter;