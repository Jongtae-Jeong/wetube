"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _videoController = require("./controller/videoController");

var _User = _interopRequireDefault(require("./models/User"));

var _routers = _interopRequireDefault(require("./routers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000".concat(_routers["default"].githubCallback)
}, _videoController.githubLoginCallback));

_passport["default"].use(new _passportFacebook["default"]({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "http://localhost:4000".concat(_routers["default"].facebookCallback)
}, _videoController.facebookLoginCallback));

_passport["default"].serializeUser(function (user, done) {
  return done(null, user);
});

_passport["default"].deserializeUser(function (id, done) {
  _User["default"].findById(id, function (err, user) {
    done(err, user);
  });
});