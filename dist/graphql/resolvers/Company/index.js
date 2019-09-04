"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _Company = _interopRequireDefault(require("../../../server/models/Company"));

var _Freight = _interopRequireDefault(require("../../../server/models/Freight"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var stringToRegexQuery = function stringToRegexQuery(val) {
  return {
    $regex: new RegExp(val)
  };
};

var _default = {
  Query: {
    company: function () {
      var _company = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, args, context, info) {
        var company;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!_id && !name)) {
                  _context.next = 2;
                  break;
                }

                throw new Error("Insert an param.");

              case 2:
                _context.next = 4;
                return _Company["default"].findOne(args).exec();

              case 4:
                company = _context.sent;

                if (company) {
                  _context.next = 7;
                  break;
                }

                throw new Error("Company not found.");

              case 7:
                return _context.abrupt("return", company);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function company(_x, _x2, _x3, _x4) {
        return _company.apply(this, arguments);
      }

      return company;
    }(),
    companys: function () {
      var _companys = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(parent, _ref, context, info) {
        var page, perpage, filter, conditions, companys;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                page = _ref.page, perpage = _ref.perpage, filter = _ref.filter;
                conditions = convertJsonToDot(filter);
                _context2.next = 4;
                return _Company["default"].find(conditions).skip(perpage * (page - 1)).limit(perpage).exec();

              case 4:
                companys = _context2.sent;
                return _context2.abrupt("return", companys.map(function (u) {
                  return {
                    _id: u._id.toString(),
                    name: u.name,
                    logo: u.logo,
                    level: u.level,
                    status: u.status
                  };
                }));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function companys(_x5, _x6, _x7, _x8) {
        return _companys.apply(this, arguments);
      }

      return companys;
    }()
  },
  Mutation: {
    createCompany: function () {
      var _createCompany = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(parent, _ref2, context, info) {
        var company;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                company = _ref2.company;
                return _context3.abrupt("return", _Company["default"].create(company));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createCompany(_x9, _x10, _x11, _x12) {
        return _createCompany.apply(this, arguments);
      }

      return createCompany;
    }(),
    updateCompany: function () {
      var _updateCompany = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(parent, _ref3, context, info) {
        var _id, company, data;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _id = _ref3._id, company = _ref3.company;
                _context4.next = 3;
                return _Company["default"].updateOne({
                  _id: _id
                }, _objectSpread({}, company), {
                  "new": true
                }).exec();

              case 3:
                data = _context4.sent;
                return _context4.abrupt("return", data.ok ? true : false);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateCompany(_x13, _x14, _x15, _x16) {
        return _updateCompany.apply(this, arguments);
      }

      return updateCompany;
    }(),
    deleteCompany: function () {
      var _deleteCompany = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(parent, _ref4, context, info) {
        var _id, company, update;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _id = _ref4._id;
                _context5.next = 3;
                return _Company["default"].findById(_id).exec();

              case 3:
                company = _context5.sent;

                if (company) {
                  _context5.next = 6;
                  break;
                }

                throw new Error("Company not found.");

              case 6:
                if (!(company.status === 1)) {
                  _context5.next = 8;
                  break;
                }

                throw new Error("Company deleted.");

              case 8:
                _context5.next = 10;
                return _Freight["default"].updateMany({
                  company: _id
                }, {
                  $set: {
                    status: false
                  }
                });

              case 10:
                _context5.next = 12;
                return _Company["default"].updateOne({
                  _id: _id
                }, {
                  status: 1
                }, {
                  "new": true
                }).exec();

              case 12:
                update = _context5.sent;
                return _context5.abrupt("return", update.ok ? true : false);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteCompany(_x17, _x18, _x19, _x20) {
        return _deleteCompany.apply(this, arguments);
      }

      return deleteCompany;
    }()
  }
};
exports["default"] = _default;