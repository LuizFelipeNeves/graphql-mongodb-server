import Freight from "../../../server/models/Freight";
import Company from "../../../server/models/Company";
import { transformFreight } from "../merge";

export default {
  Query: {
    freight: async (parent, { _id }, context, info) => {
      return await Freight.findOne({ _id })
        .populate("origin destination company")
        .exec();
    },
    freights: async (
      parent,
      {
        page = 1,
        perpage = 10,
        status = true,

        origin,
        destination,
        vehicles,
        bodies
      },
      context,
      info
    ) => {
      const query = {};
      if (status) query.status = status;
      if (origin) query.origin = origin;
      if (destination) query.destination = destination;
      if (vehicles) query.vehicles = { $in: vehicles };
      if (bodies) query.bodies = { $in: bodies };

      const res = await Freight.find(query)
        .skip(perpage * (page - 1))
        .limit(perpage)
        .populate("origin destination company")
        .exec();

      const totalcount = await Freight.countDocuments(query)
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

        // const result = await newFreight.save();
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
