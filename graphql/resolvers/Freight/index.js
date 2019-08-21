import Freight from "../../../server/models/Freight";
import Company from "../../../server/models/Company";
import Location from "../../../server/models/Location";
import {
  buildMongoConditionsFromFilters,
  FILTER_CONDITION_TYPE
} from "@entria/graphql-mongo-helpers";

const stringToRegexQuery = val => ({ $regex: new RegExp(val) });

const OriginFilterMapping = {
  city: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "destination.city"
  },
  stateuf: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "destination.state.uf"
  },
  statename: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "destination.state.name"
  },
  statebase: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "origin.state.uf"
  }
};

const DestinationFilterMapping = {
  city: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "origin.city"
  },
  stateuf: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "origin.state.uf"
  },
  statename: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "origin.state.name"
  },
  statebase: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "destination.state.uf"
  }
};

const querysfreight = [];

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

const FreightFilterMapping = {
  site: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  status: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  km: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: stringToRegexQuery
  },
  price: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: stringToRegexQuery
  },
  weight: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: stringToRegexQuery
  },
  cargo: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: stringToRegexQuery
  },
  especie: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: stringToRegexQuery
  },
  complement: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: stringToRegexQuery
  },
  tracking: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: stringToRegexQuery
  },
  note: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: stringToRegexQuery
  },
  vehicles: {
    type: FILTER_CONDITION_TYPE.CUSTOM_CONDITION,
    format: vehicles => {
      if (!vehicles) return [];
      return { vehicles: { $in: vehicles } };
    }
  },
  bodies: {
    type: FILTER_CONDITION_TYPE.CUSTOM_CONDITION,
    format: bodies => {
      if (!bodies) return [];
      return { bodies: { $in: bodies } };
    }
  },
  origincode: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "origin.code"
  },
  origincity: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "origin.city"
  },
  originstateuf: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "origin.state.uf"
  },
  originstatename: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "origin.state.name"
  },
  destinationcode: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "destination.code"
  },
  destinationcity: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "destination.city"
  },
  destinationstateuf: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "destination.state.uf"
  },
  destinationstatename: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "destination.state.name"
  },
  companyname: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "company.name"
  },
  companylevel: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "company.level"
  },
  companystatus: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "company.status"
  },
  company_id: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "company._id"
  }
};

export default {
  Query: {
    stateOrigin: async (parent, args, context, info) => {
      const { conditions } = buildMongoConditionsFromFilters(
        null,
        args.filter,
        OriginFilterMapping
      );
      return await freightaggregate("origin.state.uf", conditions);
    },
    stateDestination: async (parent, args, context, info) => {
      const { conditions } = buildMongoConditionsFromFilters(
        null,
        args.filter,
        DestinationFilterMapping
      );
      return await freightaggregate("destination.state.uf", conditions);
    },
    cityOrigin: async (parent, args, context, info) => {
      const { conditions } = buildMongoConditionsFromFilters(
        null,
        args.filter,
        OriginFilterMapping
      );
      return await freightaggregate("origin.city", conditions);
    },
    cityDestination: async (parent, args, context, info) => {
      const { conditions } = buildMongoConditionsFromFilters(
        null,
        args.filter,
        DestinationFilterMapping
      );
      return await freightaggregate("destination.city", conditions);
    },
    freight: async (parent, { _id }, context, info) => {
      if (!_id) throw new Error("Insert id.");
      return await Freight.findOne({ _id })
        .populate("origin destination company")
        .exec();
    },
    freights: async (parent, args, context, info) => {
      const { page, perpage, filter } = args;

      const { conditions } = buildMongoConditionsFromFilters(
        null,
        filter,
        FreightFilterMapping
      );

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
        { $match: conditions }
        // skip
        // limit
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
