"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controller/userController");

var _middlewares = require("../middlewares");

var _routers = _interopRequireDefault(require("../routers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get(_routers["default"].editProfile, _middlewares.onlyPrivate, _userController.getEditProfile);
userRouter.post(_routers["default"].editProfile, _middlewares.onlyPrivate, _middlewares.uploadAvatar, _userController.postEditProfile);
userRouter.get(_routers["default"].changePassword, _middlewares.onlyPrivate, _userController.getChangePassword);
userRouter.post(_routers["default"].changePassword, _middlewares.onlyPrivate, _userController.postChangePassword);
userRouter.get(_routers["default"].userDetail(), _userController.userDetail);
userRouter.get(_routers["default"].users, _userController.users);
var _default = userRouter;
exports["default"] = _default;