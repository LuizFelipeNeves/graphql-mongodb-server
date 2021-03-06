import Company from "../../../server/models/Company";
import Freight from "../../../server/models/Freight";

const convertJsonToDot = (obj, parent = [], keyValue = {}) => {
  for (let key in obj) {
    let keyPath = [...parent, key];
    if (obj[key] !== null && typeof obj[key] === "object") {
      Object.assign(keyValue, convertJsonToDot(obj[key], keyPath, keyValue));
    } else keyValue[keyPath.join(".")] = obj[key];
  }
  return keyValue;
};

const stringToRegexQuery = val => {
  return { $regex: new RegExp(val) };
};

export default {
  Query: {
    company: async (parent, args, context, info) => {
      if (!_id && !name) throw new Error("Insert an param.");
      const company = await Company.findOne(args).exec();
      if (!company) throw new Error("Company not found.");
      return company;
    },
    companys: async (parent, { page, perpage, filter }, context, info) => {
      const conditions = convertJsonToDot(filter);
      const companys = await Company.find(conditions)
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
      return Company.create(company);
    },
    updateCompany: async (parent, { _id, company }, context, info) => {
      const data = await Company.updateOne(
        { _id },
        { ...company },
        { new: true }
      ).exec();
      return data.ok ? true : false;
    },
    deleteCompany: async (parent, { _id }, context, info) => {
      const company = await Company.findById(_id).exec();
      if (!company) throw new Error("Company not found.");
      if (company.status === 1) throw new Error("Company deleted.");
      await Freight.updateMany({ company: _id }, { $set: { status: false } });
      const update = await Company.updateOne(
        { _id },
        { status: 1 },
        { new: true }
      ).exec();
      return update.ok ? true : false;
    }
  }
};
