import Company from "../../../server/models/Company";
import Freight from "../../../server/models/Freight";
import {
  buildMongoConditionsFromFilters,
  FILTER_CONDITION_TYPE
} from "@entria/graphql-mongo-helpers";

const stringToRegexQuery = val => {
  return { $regex: new RegExp(val) };
};

const CompanyFilterMapping = {
  level: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  /*
  name: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
      format: stringToRegexQuery
  },
  */
};

export default {
  Query: {
    company: async (parent, args, context, info) => {
      if (!args) {
        throw new Error("Insert an param.");
      }

      const company = await Company.findOne(args).exec();
      if (!company) {
        throw new Error("Company not found.");
      }
      return company;
    },
    companys: async (parent, args, context, info) => {
      const filterResult = buildMongoConditionsFromFilters(
        null,
        args.filter,
        CompanyFilterMapping
      );

      const companys = await Company.find(filterResult.conditions).populate().exec();

      return companys.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        logo: u.logo,
        level: u.level,
        freights: u.freights
      }));
    }
  },
  Mutation: {
    createCompany: async (parent, { company }, context, info) => {
      const newCompany = await new Company({
        name: company.name,
        logo: company.logo,
        level: company.level,
        freights: company.freights
      });

      return new Promise((resolve, reject) => {
        newCompany.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateCompany: async (parent, { _id, company }, context, info) => {
      return new Promise((resolve, reject) => {
        Company.findByIdAndUpdate(
          _id,
          { $set: { ...company } },
          { new: true }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteCompany: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Company.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Company: {
    freights: async ({ _id }, args, context, info) => {
      return await Freight.find({ company: _id });
    }
  }
};
