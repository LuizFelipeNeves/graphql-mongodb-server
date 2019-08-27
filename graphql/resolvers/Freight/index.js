import Freight from "../../../server/models/Freight";
import Company from "../../../server/models/Company";

const stringToRegexQuery = val => ({ $regex: new RegExp(val) });

const convertJsonToDot = (obj, parent = [], keyValue = {}) => {
  for (let key in obj) {
    let keyPath = [...parent, key];
    if (obj[key] !== null && typeof obj[key] === "object") {
      Object.assign(keyValue, convertJsonToDot(obj[key], keyPath, keyValue));
    } else keyValue[keyPath.join(".")] = obj[key];
  }
  return keyValue;
};

const freightquery = [
  {
    $lookup: {
      from: "companies",
      localField: "company",
      foreignField: "_id",
      as: "company"
    }
  },
  { $unwind: "$company" }
];

const freightaggregate = async (groupby, conditions) => {
  const data = await Freight.aggregate([
    ...freightquery,
    { $match: conditions },
    { $group: { _id: `$${groupby}` } }
  ]).exec();
  return Array.from(Object.keys(data), p => data[p]._id);
};

const freightfinalquery = async (res, conditions, page, perpage) => {
  const totalcount = await Freight.countDocuments(conditions).exec();
  const hasnextpage = page < totalcount / perpage;
  return {
    totalcount,
    hasnextpage,
    freights: res.map(u => ({
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
      nextel: u.nextel,
      cellphone: u.cellphone,
      telephone: u.telephone,
      whatsapp: u.whatsapp,
      sac: u.sac,
      company: u.company
    }))
  };
};

export default {
  Query: {
    stateOrigin: async (parent, args, context, info) => {
      const conditions = convertJsonToDot(args.filter);
      return await freightaggregate("origin.state.uf", conditions);
    },
    stateDestination: async (parent, args, context, info) => {
      const conditions = convertJsonToDot(args.filter);
      return await freightaggregate("destination.state.uf", conditions);
    },
    cityOrigin: async (parent, args, context, info) => {
      const conditions = convertJsonToDot(args.filter);
      return await freightaggregate("origin.city", conditions);
    },
    cityDestination: async (parent, args, context, info) => {
      const conditions = convertJsonToDot(args.filter);
      return await freightaggregate("destination.city", conditions);
    },
    freight: async (parent, { _id }, context, info) => {
      if (!_id) throw new Error("Insert id.");
      return await Freight.findOne({ _id }).exec();
    },
    freights: async (parent, args, context, info) => {
      const { page = 1, perpage = 20, filter } = args;
      const { vehicles, bodies, ...resto } = convertJsonToDot(filter);
      const conditions = { ...resto };
      if (vehicles) conditions.vehicles = { vehicles: { $in: vehicles } };
      if (bodies) conditions.bodies = { bodies: { $in: bodies } };
      const res = await Freight.aggregate([
        ...freightquery,
        { $match: conditions },
        { $skip: (page - 1) * perpage },
        { $limit: perpage }
      ]).exec();
      return freightfinalquery(res, conditions, page, perpage);
    },
    freightsrange: async (parent, args, context, info) => {
      const { page = 1, perpage = 20, filter, coordinates, range } = args;
      const { vehicles, bodies, ...resto } = convertJsonToDot(filter);
      const conditions = { ...resto };
      if (vehicles) conditions.vehicles = { vehicles: { $in: vehicles } };
      if (bodies) conditions.bodies = { bodies: { $in: bodies } };
      const res = await Freight.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates },
            distanceField: "dist.calculated",
            spherical: true,
            key: "origin.location",
            // includeLocs: "location",
            maxDistance: range,
            query: conditions
          }
        },
        { $skip: (page - 1) * perpage },
        { $limit: perpage }
      ]).exec();
      return freightfinalquery(res, conditions, page, perpage);
    }
  },
  Mutation: {
    createFreight: async (parent, { freight }, context, info) => {
      const creator = await Company.findById(freight.company);
      if (!creator) throw new Error("Company not found.");
      return await Freight.create(freight);
    },
    updateFreight: async (parent, { _id, freight }, context, info) => {
      const update = await Freight.updateOne(
        { _id },
        { $set: { ...freight } },
        { new: true }
      ).exec();
      return update.ok ? true : false;
    },
    deleteFreight: async (parent, args, context, info) => {
      if (!_id && !url) throw new Error("Insert an param.");
      const update = await Freight.updateOne(
        args,
        { status: false },
        { new: true }
      ).exec();
      return update.ok ? true : false;
    }
  },
  Subscription: {
    freight: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  },
  Freight: {
    company: async ({ company }, args, context, info) => {
      return await Company.findOne({ _id: company });
    }
  }
};
