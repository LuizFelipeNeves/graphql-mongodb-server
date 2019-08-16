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
    _id: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      key: "company._id"
    }
  }
};

export default {
  Query: {
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
        FreightFilterMapping
      );
      const { conditions, pipeline } = filterResult.conditions;
      //const finalPipeline = [{ $match: conditions }, ...pipeline];

      console.log(conditions, pipeline);

      const res = await Freight.find(filterResult.conditions)
        .skip(perpage * (page - 1))
        .limit(perpage)
        .populate("origin destination") // company
        .exec();

      const totalcount = await Freight.countDocuments(filterResult.conditions)
        .populate("origin destination") // company
        .exec();

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
      const newFreight = await Freight.create({
        url: freight.url,
        site: freight.site,
        origin: freight.origin,
        destination: freight.destination,
        status: freight.status,
        km: freight.km,
        price: freight.price,
        weight: freight.weight,
        cargo: freight.cargo,
        especie: freight.especie, // TODOFIX: Translate
        complement: freight.complement,
        tracking: freight.tracking,
        note: freight.note,
        vehicles: freight.vehicles,
        bodies: freight.bodies,
        nextel: freight.nextel,
        cellphone: freight.cellphone,
        telephone: freight.telephone,
        whatsapp: freight.whatsapp,
        sac: freight.sac, // TODOFIX: Translate
        company: freight.company
      });

      const creator = await Company.findById(freight.company);
      if (!creator) throw new Error("Company not found.");

      const origin = await Location.findById(freight.origin);
      if (!origin) throw new Error("Origin not found.");

      const destination = await Location.findById(freight.destination);
      if (!destination) throw new Error("Destination not found.");

      try {
        // const result = await newFreight.save(); // TODOFIX: DEVERIA RETORNAR O FRETE COM AS AGREGACOES
        return new Promise((resolve, reject) => {
          newFreight.save((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateFreight: async (parent, { _id, freight }, context, info) => {
      return new Promise((resolve, reject) => {
        Freight.findByIdAndUpdate(
          _id,
          { $set: { ...freight } },
          { new: true }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteFreight: async (parent, { _id }, context, info) => {
      try {
        return new Promise((resolve, reject) => {
          Freight.findByIdAndDelete(_id).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Subscription: {
    freight: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  }
};
