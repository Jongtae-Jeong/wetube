"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controller/videoController");

var _routers = _interopRequireDefault(require("../routers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.post(_routers["default"].registerView, _videoController.postRegisterView);
apiRouter.post(_routers["default"].addComment, _videoController.postAddcomment);
var _default = apiRouter;
exports["default"] = _default;