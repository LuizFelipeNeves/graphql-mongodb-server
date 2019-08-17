import Company from "../../../server/models/Company";
import {
  buildMongoConditionsFromFilters,
  FILTER_CONDITION_TYPE
} from "@entria/graphql-mongo-helpers";
import Freight from "../../../server/models/Freight";

const stringToRegexQuery = val => {
  return { $regex: new RegExp(val) };
};

const CompanyFilterMapping = {
  level: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  status: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  name: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: stringToRegexQuery
  }
};

export default {
  Query: {
    company: async (parent, args, context, info) => {
      if (!args) throw new Error("Insert an param.");
      const company = await Company.findOne(args).exec();
      if (!company) throw new Error("Company not found.");
      return company;
    },
    companys: async (parent, { page, perpage, filter }, context, info) => {
      const filterResult = buildMongoConditionsFromFilters(
        null,
        filter,
        CompanyFilterMapping
      );
      const companys = await Company.find(filterResult.conditions)
        .skip(perpage * (page - 1))
        .limit(perpage)
        .exec();

      return companys.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        logo: u.logo,
        level: u.level,
        status: u.status
      }));
    }
  },
  Mutation: {
    createCompany: async (parent, { company }, context, info) => {
      const newCompany = await new Company({
        name: company.name,
        logo: company.logo,
        level: company.level,
        status: company.status
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
      const company = await Company.findById(_id).exec();
      if (!company) throw new Error("Company not found.");
      if (company.status === 1) throw new Error("Company deleted.");
      await Freight.updateMany({ company: _id }, { $set: { status: false } });
      return new Promise((resolve, reject) =>
        Company.findByIdAndUpdate(_id, { status: 1 }).exec((err, res) => {
          err ? reject(err) : resolve(res);
        })
      );
    }
  }
};
