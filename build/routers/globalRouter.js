"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _userController = require("../controller/userController");

var _videoController = require("../controller/videoController");

var _middlewares = require("../middlewares");

var _routers = _interopRequireDefault(require("../routers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get(_routers["default"].join, _middlewares.onlyPublic, _videoController.getJoin);
globalRouter.post(_routers["default"].join, _middlewares.onlyPublic, _videoController.postJoin, _videoController.postLogin);
globalRouter.get(_routers["default"].login, _middlewares.onlyPublic, _videoController.getLogin);
globalRouter.post(_routers["default"].login, _middlewares.onlyPublic, _videoController.postLogin);
globalRouter.get(_routers["default"].home, _userController.home);
globalRouter.get(_routers["default"].logout, _middlewares.onlyPrivate, _videoController.logout);
globalRouter.get(_routers["default"].github, _videoController.githubLogin);
globalRouter.get(_routers["default"].githubCallback, _passport["default"].authenticate("github", {
  failureRedirect: "/login"
}), _videoController.postGithubLogin);
globalRouter.get(_routers["default"].facebook, _videoController.facebookLogin);
globalRouter.get(_routers["default"].facebookCallback, _passport["default"].authenticate("facebook", {
  failureRedirect: "/login"
}, _videoController.postFacebookLogin));
globalRouter.get(_routers["default"].me, _videoController.getMe);
globalRouter.get(_routers["default"].search, _userController.search);
var _default = globalRouter;
exports["default"] = _default;