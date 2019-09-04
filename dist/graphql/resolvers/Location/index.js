"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _Location = _interopRequireDefault(require("../../../server/models/Location"));

var convertJsonToDot = function convertJsonToDot(obj) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var keyValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  for (var key in obj) {
    var keyPath = [].concat((0, _toConsumableArray2["default"])(parent), [key]);

    if (obj[key] !== null && (0, _typeof2["default"])(obj[key]) === "object") {
      Object.assign(keyValue, convertJsonToDot(obj[key], keyPath, keyValue));
    } else keyValue[keyPath.join(".")] = obj[key];
  }

  return keyValue;
};

var _default = {
  Query: {
    location: function () {
      var _location = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, _ref, context, info) {
        var filter, conditions;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filter = _ref.filter;

                if (filter) {
                  _context.next = 3;
                  break;
                }

                throw new Error("Insert a param.");

              case 3:
                conditions = convertJsonToDot(filter);
                _context.next = 6;
                return _Location["default"].findOne(conditions).exec();

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function location(_x, _x2, _x3, _x4) {
        return _location.apply(this, arguments);
      }

      return location;
    }(),
    locations: function () {
      var _locations = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(parent, _ref2, context, info) {
        var page, perpage, fiter, conditions, locations, totalcount, hasnextpage;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                page = _ref2.page, perpage = _ref2.perpage, fiter = _ref2.fiter;
                conditions = convertJsonToDot(filter);
                _context2.next = 4;
                return _Location["default"].find(conditions).skip(perpage * (page - 1)).limit(perpage).exec();

              case 4:
                locations = _context2.sent;
                _context2.next = 7;
                return _Location["default"].countDocuments(filterResult.conditions).exec();

              case 7:
                totalcount = _context2.sent;
                hasnextpage = page < totalcount / perpage;
                return _context2.abrupt("return", {
                  totalcount: totalcount,
                  hasnextpage: hasnextpage,
                  locations: locations.map(function (u) {
                    return {
                      _id: u._id.toString(),
                      city: u.city,
                      state: u.state,
                      location: u.location
                    };
                  })
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function locations(_x5, _x6, _x7, _x8) {
        return _locations.apply(this, arguments);
      }

      return locations;
    }()
  }
};
exports["default"] = _default;