"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _graphqlYoga = require("graphql-yoga");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _graphql = _interopRequireDefault(require("../graphql/"));

var _db = require("./config/db/");

require("dotenv").config();

var db = process.env.mongoURI;
var pubsub = new _graphqlYoga.PubSub();
var options = {
  port: process.env.PORT || "4000",
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
  bodyParserOptions: "text"
};
var context = {
  models: _db.models,
  pubsub: pubsub
}; // Connect to MongoDB with Mongoose.

_mongoose["default"].connect(db, {
  useCreateIndex: true,
  useNewUrlParser: true
}).then(function () {
  return console.log("MongoDB connected");
})["catch"](function (err) {
  return console.log(err);
});

var server = new _graphqlYoga.GraphQLServer({
  schema: _graphql["default"],
  context: context
});
server.start(options, function (_ref) {
  var port = _ref.port;
  console.log("\uD83D\uDE80 Server is running on http://localhost:".concat(port));
});