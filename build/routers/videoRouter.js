"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controller/videoController");

var _middlewares = require("../middlewares");

var _routers = _interopRequireDefault(require("../routers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get(_routers["default"].videos, _videoController.videos);
videoRouter.get(_routers["default"].upload, _middlewares.onlyPrivate, _videoController.getupload);
videoRouter.post(_routers["default"].upload, _middlewares.onlyPrivate, _middlewares.uploadVideo, _videoController.postUpload);
videoRouter.get(_routers["default"].editVideo(), _middlewares.onlyPrivate, _videoController.getEditVideo);
videoRouter.post(_routers["default"].editVideo(), _middlewares.onlyPrivate, _videoController.postEditVideo);
videoRouter.get(_routers["default"].videoDetail(), _videoController.videoDetail);
videoRouter.get(_routers["default"].deleteVideo(), _middlewares.onlyPrivate, _videoController.deleteVideo);
var _default = videoRouter;
exports["default"] = _default;