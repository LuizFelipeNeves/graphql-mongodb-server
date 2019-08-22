import Freight from "../../../server/models/Freight";
import Company from "../../../server/models/Company";
import Location from "../../../server/models/Location";

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

const freightaggregate = async (groupby, conditions) => {
  const data = await Freight.aggregate([
    {
      $lookup: {
        from: "locations",
        localField: "origin",
        foreignField: "_id",
        as: "origin"
      }
    },
    {
      $lookup: {
        from: "locations",
        localField: "destination",
        foreignField: "_id",
        as: "destination"
      }
    },
    { $unwind: "$destination" },
    { $unwind: "$origin" },
    { $match: conditions },
    { $group: { _id: `$${groupby}` } }
  ]).exec();
  return Array.from(Object.keys(data), p => data[p]._id);
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
      return await Freight.findOne({ _id })
        .populate("origin destination company")
        .exec();
    },
    freights: async (parent, args, context, info) => {
      const { page = 1, perpage = 20, filter } = args;
      const { vehicles, bodies, ...resto } = convertJsonToDot(filter);
      const conditions = { ...resto };
      if (vehicles) conditions.vehicles = { vehicles: { $in: vehicles } };
      if (bodies) conditions.bodies = { bodies: { $in: bodies } };
      const res = await Freight.aggregate([
        {
          $lookup: {
            from: "locations",
            localField: "origin",
            foreignField: "_id",
            as: "origin"
          }
        },
        {
          $lookup: {
            from: "locations",
            localField: "destination",
            foreignField: "_id",
            as: "destination"
          }
        },
        {
          $lookup: {
            from: "companies",
            localField: "company",
            foreignField: "_id",
            as: "company"
          }
        },
        { $unwind: "$destination" },
        { $unwind: "$origin" },
        { $unwind: "$company" },
        { $match: conditions },
        { $skip: (page - 1) * perpage },
        { $limit: perpage }
      ]).exec();

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
    }
  },
  Mutation: {
    createFreight: async (parent, { freight }, context, info) => {
      const creator = await Company.findById(freight.company);
      if (!creator) throw new Error("Company not found.");

      const origin = await Location.findById(freight.origin);
      if (!origin) throw new Error("Origin not found.");

      const destination = await Location.findById(freight.destination);
      if (!destination) throw new Error("Destination not found.");
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
  }
  /*
  // Pode ser usado para inserir campos a mais.. com querys prontas
  ou fazer relacionamentos

  Freight: {
    origin: async ({ origin }, args, context, info) => { // parent
      console.log(origin);
      return await Location.findOne({ _id: origin });
    },
    destination: async ({ destination }, args, context, info) => {
      console.log(destination);
      return await Location.findOne({ _id: destination });
    }
  }*/
};
