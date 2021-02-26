import express from "express";
import { deleteVideo, getEditVideo, getupload, postEditVideo, postUpload, videoDetail, videos } from "../controller/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";
import routes from "../routers";

const videoRouter = express.Router();

videoRouter.get(routes.videos, videos);


videoRouter.get(routes.upload,onlyPrivate, getupload);
videoRouter.post(routes.upload,onlyPrivate, uploadVideo,postUpload);

videoRouter.get(routes.editVideo(),onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(),onlyPrivate, postEditVideo);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.deleteVideo(),onlyPrivate, deleteVideo);





export default videoRouter;