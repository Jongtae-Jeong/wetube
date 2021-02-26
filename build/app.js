"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _path = _interopRequireDefault(require("path"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _routers = _interopRequireDefault(require("./routers"));

var _middlewares = require("./middlewares");

require("./passport");

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var CokieStore = (0, _connectMongo["default"])(_expressSession["default"]);
app.set("view engine", "pug");
app.use((0, _helmet["default"])({
  contentSecurityPolicy: false
}));
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])("dev"));
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CokieStore({
    mongooseConnection: _mongoose["default"].connection
  })
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(function (req, res, next) {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
  return next();
});
app.set("views", _path["default"].join(__dirname, "views"));
app.use("/static", _express["default"]["static"](_path["default"].join(__dirname, "static")));
app.use("/uploads", _express["default"]["static"](_path["default"].join(__dirname, "uploads")));
app.use(_middlewares.localsMiddleware);
app.use(_routers["default"].home, _globalRouter["default"]);
app.use(_routers["default"].users, _userRouter["default"]);
app.use(_routers["default"].videos, _videoRouter["default"]);
app.use(_routers["default"].api, _apiRouter["default"]);
var _default = app;
exports["default"] = _default;