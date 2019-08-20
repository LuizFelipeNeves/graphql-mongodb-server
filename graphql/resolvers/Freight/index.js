import Freight from "../../../server/models/Freight";
import Company from "../../../server/models/Company";
import Location from "../../../server/models/Location";
import {
  buildMongoConditionsFromFilters,
  FILTER_CONDITION_TYPE
} from "@entria/graphql-mongo-helpers";

const stringToRegexQuery = val => {
  return { $regex: new RegExp(val) };
};

const StateOriginFilterMapping = {
  city: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  stateuf: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "destination.state.uf"
  },
  statename: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      key: "destination.state.name"
  }
};

const StateDestinationFilterMapping = {
  city: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  stateuf: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "origin.state.uf"
  },
  statename: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      key: "origin.state.name"
  }
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
  origin: {
    code: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
    },
    city: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
    },
    state: {
      uf: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
        key: "state.name"
      }
    },
    state: {
      name: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
        key: "state.uf"
      }
    }
  },
  destination: {
    code: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
    },
    city: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
    },
    state: {
      uf: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
        key: "state.name"
      }
    },
    state: {
      name: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
        key: "state.uf"
      }
    }
  },
  company: {
    type: FILTER_CONDITION_TYPE.AGGREGATE_PIPELINE,
    pipeline: value => [
      {
        $lookup: {
          localField: "company",
          from: "company",
          foreignField: "_id",
          as: "company"
        }
      },
      {
        $unwind: "$company"
      }
    ],
    name: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      key: "company.name"
    },
    level: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      key: "company.level"
    },
    status: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      key: "company.status"
    },
    _id: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      key: "company._id"
    }
  }
};

export default {
  Query: {
    stateOrigin: async (parent, args, context, info) => {
      const { conditions } = buildMongoConditionsFromFilters(
        null,
        args.destination,
        StateOriginFilterMapping
      );
      const states = await Freight.aggregate([{
        $lookup: {
          from: 'locations',
          localField: 'origin',
          foreignField: '_id',
          as: 'origin',
        },
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'destination',
          foreignField: '_id',
          as: 'destination',
        },
      },
      {  
          $unwind:'$destination'
      }, 
      {
          $unwind:'$origin',
      },
      { $match: conditions },
      {
          $group: {
              _id: "$origin.state.uf",
          }
      }]).exec();
      return Array.from(Object.keys(states), p => states[p]._id); 
    },
    stateDestination: async (parent, args, context, info) => {
      const { conditions } = buildMongoConditionsFromFilters(
        null,
        args.origin,
        StateDestinationFilterMapping
      );
      const states = await Freight.aggregate([{
        $lookup: {
          from: 'locations',
          localField: 'origin',
          foreignField: '_id',
          as: 'origin',
        },
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'destination',
          foreignField: '_id',
          as: 'destination',
        },
      },
      {  
          $unwind:'$destination'
      }, 
      {
          $unwind:'$origin',
      },
      { $match: conditions },
      {
          $group: {
              _id: "$destination.state.uf",
          }
      }]).exec();
      return Array.from(Object.keys(states), p => states[p]._id);
    },
    freight: async (parent, { _id }, context, info) => {
      if (!_id) throw new Error("Insert id.");
      return await Freight.findOne({ _id })
        .populate("origin destination company")
        .exec();
    },
    freights: async (parent, args, context, info) => {
      const { page, perpage } = args;

      const filterResult = buildMongoConditionsFromFilters(
        null,
        args.filter,
        FreightFilterMapping // TODOFIX: Agregações
      );

      const { conditions, pipeline } = filterResult.conditions;
      const finalPipeline = [{ $match: conditions }, ...pipeline];

      console.log(conditions, pipeline);

      const res = await Freight.find(filterResult.conditions)
        .skip(perpage * (page - 1))
        .limit(perpage)
        .populate("origin destination company")
        .exec();

      const totalcount = await Freight.countDocuments(
        filterResult.conditions
      ).exec();

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
