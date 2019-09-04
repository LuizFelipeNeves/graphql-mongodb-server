"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../../../server/models/User"));

var _default = {
  Query: {
    user: function () {
      var _user = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, args, context, info) {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!_id && !email)) {
                  _context.next = 2;
                  break;
                }

                throw new Error("Insert an param.");

              case 2:
                _context.next = 4;
                return _User["default"].findOne(args).exec();

              case 4:
                user = _context.sent;

                if (user) {
                  _context.next = 7;
                  break;
                }

                throw new Error("User not found.");

              case 7:
                return _context.abrupt("return", user);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function user(_x, _x2, _x3, _x4) {
        return _user.apply(this, arguments);
      }

      return user;
    }(),
    users: function () {
      var _users = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(parent, args, context, info) {
        var users;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _User["default"].find({}).exec();

              case 2:
                users = _context2.sent;
                return _context2.abrupt("return", users.map(function (u) {
                  return {
                    _id: u._id.toString(),
                    first_name: u.first_name,
                    last_name: u.last_name,
                    email: u.email,
                    password: u.password,
                    telephones: u.telephones,
                    role: u.role,
                    status: u.status
                  };
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function users(_x5, _x6, _x7, _x8) {
        return _users.apply(this, arguments);
      }

      return users;
    }()
  },
  Mutation: {
    createUser: function () {
      var _createUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(parent, _ref, context, info) {
        var user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                user = _ref.user;
                _context3.next = 3;
                return _User["default"].create(user);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createUser(_x9, _x10, _x11, _x12) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }(),
    updateUser: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(parent, _ref2, context, info) {
        var _id, user, update;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _id = _ref2._id, user = _ref2.user;
                _context4.next = 3;
                return Freight.updateOne({
                  _id: _id
                }, user, {
                  "new": true
                }).exec();

              case 3:
                update = _context4.sent;
                return _context4.abrupt("return", update.ok ? true : false);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateUser(_x13, _x14, _x15, _x16) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }(),
    deleteUser: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(parent, _ref3, context, info) {
        var _id, update;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _id = _ref3._id;
                _context5.next = 3;
                return Freight.updateOne({
                  _id: _id
                }, {
                  status: 1
                }, {
                  "new": true
                }).exec();

              case 3:
                update = _context5.sent;
                return _context5.abrupt("return", update.ok ? true : false);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteUser(_x17, _x18, _x19, _x20) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }
};
exports["default"] = _default;