import Company from "../../../server/models/Company";
import Frete from "../../../server/models/Frete";

export default {
  Query: {
    company: async (parent, { _id }, context, info) => {
      return await Company.findOne({ _id }).exec();
    },
    companys: async (parent, args, context, info) => {
      const companys = await Company.find({})
        .populate()
        .exec();

      return companys.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        logo: u.logo,
        level: u.level,
        fretes: u.fretes
      }));
    }
  },
  Mutation: {
    createCompany: async (parent, { company }, context, info) => {
      const newCompany = await new Company({
        name: company.name,
        logo: company.logo,
        level: company.level,
        fretes: company.fretes
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
    fretes: async ({ _id }, args, context, info) => {
      return await Frete.find({ empresa: _id });
    }
  }
};
