"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _Freight = _interopRequireDefault(require("../../../server/models/Freight"));

var _Company = _interopRequireDefault(require("../../../server/models/Company"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var stringToRegexQuery = function stringToRegexQuery(val) {
  return {
    $regex: new RegExp(val)
  };
};

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

var freightquery = [{
  $lookup: {
    from: "companies",
    localField: "company",
    foreignField: "_id",
    as: "company"
  }
}, {
  $unwind: "$company"
}];

var freightaggregate =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(groupby, conditions) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Freight["default"].aggregate([].concat(freightquery, [{
              $match: conditions
            }, {
              $group: {
                _id: "$".concat(groupby)
              }
            }])).exec();

          case 2:
            data = _context.sent;
            return _context.abrupt("return", Array.from(Object.keys(data), function (p) {
              return data[p]._id;
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function freightaggregate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var freightfinalquery =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(res, conditions, page, perpage) {
    var totalcount, hasnextpage;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return console.log(conditions);

          case 2:
            _context2.next = 4;
            return _Freight["default"].countDocuments(conditions).exec();

          case 4:
            totalcount = _context2.sent;
            hasnextpage = page < totalcount / perpage;
            return _context2.abrupt("return", {
              totalcount: totalcount,
              hasnextpage: hasnextpage,
              freights: res.map(function (u) {
                return {
                  _id: u._id.toString(),
                  url: u.url,
                  site: u.site,
                  origin: u.origin,
                  destination: u.destination,
                  status: u.status,
                  km: u.km,
                  price: u.price,
                  weight: u.weight,
                  cargo: u.cargo,
                  especie: u.especie,
                  complement: u.complement,
                  tracking: u.tracking,
                  note: u.note,
                  vehicles: u.vehicles,
                  bodies: u.bodies,
                  cellphone: u.cellphone,
                  telephone: u.telephone,
                  whatsapp: u.whatsapp,
                  sac: u.sac,
                  company: u.company
                };
              })
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function freightfinalquery(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  Query: {
    stateOrigin: function () {
      var _stateOrigin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(parent, args, context, info) {
        var conditions;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                conditions = convertJsonToDot(args.filter);
                _context3.next = 3;
                return freightaggregate("origin.state.uf", conditions);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function stateOrigin(_x7, _x8, _x9, _x10) {
        return _stateOrigin.apply(this, arguments);
      }

      return stateOrigin;
    }(),
    stateDestination: function () {
      var _stateDestination = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(parent, args, context, info) {
        var conditions;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                conditions = convertJsonToDot(args.filter);
                _context4.next = 3;
                return freightaggregate("destination.state.uf", conditions);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function stateDestination(_x11, _x12, _x13, _x14) {
        return _stateDestination.apply(this, arguments);
      }

      return stateDestination;
    }(),
    cityOrigin: function () {
      var _cityOrigin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(parent, args, context, info) {
        var conditions;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                conditions = convertJsonToDot(args.filter);
                _context5.next = 3;
                return freightaggregate("origin.city", conditions);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function cityOrigin(_x15, _x16, _x17, _x18) {
        return _cityOrigin.apply(this, arguments);
      }

      return cityOrigin;
    }(),
    cityDestination: function () {
      var _cityDestination = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(parent, args, context, info) {
        var conditions;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                conditions = convertJsonToDot(args.filter);
                _context6.next = 3;
                return freightaggregate("destination.city", conditions);

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function cityDestination(_x19, _x20, _x21, _x22) {
        return _cityDestination.apply(this, arguments);
      }

      return cityDestination;
    }(),
    freight: function () {
      var _freight = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(parent, _ref3, context, info) {
        var _id;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _id = _ref3._id;

                if (_id) {
                  _context7.next = 3;
                  break;
                }

                throw new Error("Insert id.");

              case 3:
                _context7.next = 5;
                return _Freight["default"].findOne({
                  _id: _id
                }).exec();

              case 5:
                return _context7.abrupt("return", _context7.sent);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function freight(_x23, _x24, _x25, _x26) {
        return _freight.apply(this, arguments);
      }

      return freight;
    }(),
    freights: function () {
      var _freights = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(parent, args, context, info) {
        var _args$page, page, _args$perpage, perpage, filter, _convertJsonToDot, vehicles, bodies, resto, conditions, res;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _args$page = args.page, page = _args$page === void 0 ? 1 : _args$page, _args$perpage = args.perpage, perpage = _args$perpage === void 0 ? 20 : _args$perpage, filter = args.filter;
                _convertJsonToDot = convertJsonToDot(filter), vehicles = _convertJsonToDot.vehicles, bodies = _convertJsonToDot.bodies, resto = (0, _objectWithoutProperties2["default"])(_convertJsonToDot, ["vehicles", "bodies"]);
                conditions = _objectSpread({}, resto);
                if (vehicles) conditions.vehicles = {
                  vehicles: {
                    $in: vehicles
                  }
                };
                if (bodies) conditions.bodies = {
                  bodies: {
                    $in: bodies
                  }
                };
                _context8.next = 7;
                return _Freight["default"].aggregate([].concat(freightquery, [{
                  $match: conditions
                }, {
                  $skip: (page - 1) * perpage
                }, {
                  $limit: perpage
                }])).exec();

              case 7:
                res = _context8.sent;
                return _context8.abrupt("return", freightfinalquery(res, conditions, page, perpage));

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function freights(_x27, _x28, _x29, _x30) {
        return _freights.apply(this, arguments);
      }

      return freights;
    }(),
    freightsrange: function () {
      var _freightsrange = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(parent, args, context, info) {
        var _args$page2, page, _args$perpage2, perpage, filter, coordinates, range, _convertJsonToDot2, vehicles, bodies, resto, conditions, res;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _args$page2 = args.page, page = _args$page2 === void 0 ? 1 : _args$page2, _args$perpage2 = args.perpage, perpage = _args$perpage2 === void 0 ? 20 : _args$perpage2, filter = args.filter, coordinates = args.coordinates, range = args.range;
                _convertJsonToDot2 = convertJsonToDot(filter), vehicles = _convertJsonToDot2.vehicles, bodies = _convertJsonToDot2.bodies, resto = (0, _objectWithoutProperties2["default"])(_convertJsonToDot2, ["vehicles", "bodies"]);
                conditions = _objectSpread({}, resto);
                if (vehicles) conditions.vehicles = {
                  vehicles: {
                    $in: vehicles
                  }
                };
                if (bodies) conditions.bodies = {
                  bodies: {
                    $in: bodies
                  }
                };
                _context9.next = 7;
                return _Freight["default"].aggregate([{
                  $geoNear: {
                    near: {
                      type: "Point",
                      coordinates: coordinates
                    },
                    distanceField: "dist.calculated",
                    spherical: true,
                    key: "origin.location",
                    // includeLocs: "location",
                    maxDistance: range,
                    query: conditions
                  }
                }, {
                  $skip: (page - 1) * perpage
                }, {
                  $limit: perpage
                }]).exec();

              case 7:
                res = _context9.sent;
                return _context9.abrupt("return", freightfinalquery(res, conditions, page, perpage));

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function freightsrange(_x31, _x32, _x33, _x34) {
        return _freightsrange.apply(this, arguments);
      }

      return freightsrange;
    }()
  },
  Mutation: {
    createFreight: function () {
      var _createFreight = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(parent, _ref4, context, info) {
        var freight, creator;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                freight = _ref4.freight;
                _context10.next = 3;
                return _Company["default"].findById(freight.company);

              case 3:
                creator = _context10.sent;

                if (creator) {
                  _context10.next = 6;
                  break;
                }

                throw new Error("Company not found.");

              case 6:
                _context10.next = 8;
                return _Freight["default"].create(freight);

              case 8:
                return _context10.abrupt("return", _context10.sent);

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function createFreight(_x35, _x36, _x37, _x38) {
        return _createFreight.apply(this, arguments);
      }

      return createFreight;
    }(),
    updateFreight: function () {
      var _updateFreight = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(parent, _ref5, context, info) {
        var _id, freight, update;

        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _id = _ref5._id, freight = _ref5.freight;
                _context11.next = 3;
                return _Freight["default"].updateOne({
                  _id: _id
                }, {
                  $set: _objectSpread({}, freight)
                }, {
                  "new": true
                }).exec();

              case 3:
                update = _context11.sent;
                return _context11.abrupt("return", update.ok ? true : false);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function updateFreight(_x39, _x40, _x41, _x42) {
        return _updateFreight.apply(this, arguments);
      }

      return updateFreight;
    }(),
    deleteFreight: function () {
      var _deleteFreight = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12(parent, args, context, info) {
        var update;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(!_id && !url)) {
                  _context12.next = 2;
                  break;
                }

                throw new Error("Insert an param.");

              case 2:
                _context12.next = 4;
                return _Freight["default"].updateOne(args, {
                  status: false
                }, {
                  "new": true
                }).exec();

              case 4:
                update = _context12.sent;
                return _context12.abrupt("return", update.ok ? true : false);

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function deleteFreight(_x43, _x44, _x45, _x46) {
        return _deleteFreight.apply(this, arguments);
      }

      return deleteFreight;
    }()
  },
  Subscription: {
    freight: {
      subscribe: function subscribe(parent, args, _ref6) {//return pubsub.asyncIterator(channel)

        var pubsub = _ref6.pubsub;
      }
    }
  },
  Freight: {
    company: function () {
      var _company2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee13(_ref7, args, context, info) {
        var _company;

        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _company = _ref7.company;
                _context13.next = 3;
                return _Company["default"].findOne({
                  _id: _company
                });

              case 3:
                return _context13.abrupt("return", _context13.sent);

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function company(_x47, _x48, _x49, _x50) {
        return _company2.apply(this, arguments);
      }

      return company;
    }()
  }
};
exports["default"] = _default;