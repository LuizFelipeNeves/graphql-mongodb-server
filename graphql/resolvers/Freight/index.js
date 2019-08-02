import Freight from "../../../server/models/Freight";
import Company from "../../../server/models/Company";
import { transformFreight } from "../merge";
import { buildMongoConditionsFromFilters, FILTER_CONDITION_TYPE } from '@entria/graphql-mongo-helpers';

const stringToRegexQuery = (val) => {
  return { $regex: new RegExp(val) }
}

const FreightFilterMapping = {
  site: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
  },
  status: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
  },
  km: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
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
      if (!vehicles) return []
      return { vehicles: { $in: vehicles } };
    },
  },
  bodies: {
    type: FILTER_CONDITION_TYPE.CUSTOM_CONDITION,
    format: bodies => {
      if (!bodies) return []
      return { bodies: { $in: bodies } };
    },
  },
  origin: {
      code: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
        //format: stringToRegexQuery
      },
      city: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
        //format: stringToRegexQuery
      },
      state: {
        uf: {
          type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
          key: 'state.name'
        }
      },
      state: {
        name: {
          type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
          key: 'state.uf'
        }
      },
  },
  destination: {
      code: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
        //format: stringToRegexQuery
      },
      city: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
        //format: stringToRegexQuery
      },
      state: {
        uf: {
          type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
          key: 'state.name'
        }
      },
      state: {
        name: {
          type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
          key: 'state.uf'
        }
      },
  },
  /*
      name: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      },
      level: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      },
      _id: {
        type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      },

  */
  
  company: {
      type: FILTER_CONDITION_TYPE.AGGREGATE_PIPELINE,
      pipeline: value => [
        { 
          $lookup: {
            from: "company",
            localField: "name",
            foreignField: "name",
            as: "company"
          },
        },
      ]
  },
}

export default {
  Query: {
    freight: async (parent, { _id }, context, info) => {
      return await Freight.findOne({ _id })
        .populate("origin destination company")
        .exec();
    },
    freights: async (parent, args, context, info) => {
      const { page, perpage } = args
      const filterResult = buildMongoConditionsFromFilters(null, args.filter, FreightFilterMapping)
      console.log(filterResult.conditions)

      const res = await Freight.find(filterResult.conditions)
        .skip(perpage * (page - 1))
        .limit(perpage)
        .populate("origin destination company")
        .exec();

      const totalcount = await Freight.countDocuments(filterResult.conditions)
        .populate("origin destination company")
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

      try {
        const creator = await Company.findById(freight.company);
        if (!creator) {
          throw new Error("Company not found.");
        }
        // TODOME: Check exist origin/destination

        // const result = await newFreight.save(); // TODOFIX: DEVERIA RETORNAR O FRETE COM AS AGREGACOES
        const result = await new Promise((resolve, reject) => {
          newFreight.save((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
        const createdFreight = transformFreight(result);
        creator.freights.push(newFreight);
        await creator.save();
        return createdFreight;
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
        // searching for creator of the freight and deleting it from the list
        const freight = await Freight.findById(_id);
        const creator = await Company.findById(freight.company);
        if (!creator) {
          throw new Error("Company not found.");
        }
        const index = creator.freights.indexOf(_id);
        if (index > -1) {
          creator.freights.splice(index, 1);
        }
        await creator.save();
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
  },
  Freight: {
    company: async ({ company }, args, context, info) => {
      return await Company.findById(company);
    }
  }
};
