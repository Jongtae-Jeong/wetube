"use strict";

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./db");

var _app = _interopRequireDefault(require("./app"));

require("./models/Video");

require("./models/User");

require("./models/Comment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 4000;

var HandleListening = function HandleListening() {
  return console.log("Listening on : http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, HandleListening);