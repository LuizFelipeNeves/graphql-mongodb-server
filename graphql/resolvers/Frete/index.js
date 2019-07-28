import Frete from "../../../server/models/Frete";
import Company from "../../../server/models/Company";
import { transformFrete } from "../merge";

export default {
  Query: {
    frete: async (parent, { _id }, context, info) => {
      return await Frete.findOne({ _id })
        .populate("origem destino empresa")
        .exec();
    },
    fretes: async (
      parent,
      { page = 1, perpage = 10, veiculo, carroceria },
      context,
      info
    ) => {
      const query = {
        veiculo,
        carroceria
      };

      const res = await Frete.find(query)
        .skip(perpage * (page - 1))
        .limit(perpage)
        .populate("origem destino empresa")
        .exec();

      console.log(res);

      const totalcount = await Frete.countDocuments(query)
        .populate("origem destino empresa")
        .exec();
      const hasnextpage = page < totalcount / perpage;

      return {
        totalcount,
        hasnextpage,
        fretes: res.map(u => ({
          _id: u._id.toString(),
          url: u.url,
          origem: u.origem,
          destino: u.destino,
          status: u.status,
          km: u.km,
          preco: u.preco,
          peso: u.peso,
          carga: u.carga,
          especie: u.especie,
          complemento: u.complemento,
          rastreamento: u.rastreamento,
          obs: u.obs,
          veiculos: u.veiculos,
          carrocerias: u.carrocerias,
          nextel: u.nextel,
          celular: u.celular,
          fone: u.fone,
          whatsapp: u.whatsapp,
          sac: u.sac,
          empresa: u.empresa
        }))
      };
    }
  },
  Mutation: {
    createFrete: async (parent, { frete }, context, info) => {
      const newFrete = await Frete.create({
        url: frete.url,
        origem: frete.origem,
        destino: frete.destino,
        status: frete.status,
        km: frete.km,
        preco: frete.preco,
        peso: frete.peso,
        carga: frete.carga,
        especie: frete.especie,
        complemento: frete.complemento,
        rastreamento: frete.rastreamento,
        obs: frete.obs,
        veiculos: frete.veiculos,
        carrocerias: frete.carrocerias,
        nextel: frete.nextel,
        celular: frete.celular,
        fone: frete.fone,
        whatsapp: frete.whatsapp,
        sac: frete.sac,
        empresa: frete.empresa
      });

      try {
        const creator = await Company.findById(frete.empresa);
        if (!creator) {
          throw new Error("Company not found.");
        }
        // TODOME: Check exist origem/destino

        // const result = await newFrete.save();
        const result = await new Promise((resolve, reject) => {
          newFrete.save((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
        const createdFrete = transformFrete(result);
        creator.fretes.push(newFrete);
        await creator.save();
        return createdFrete;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateFrete: async (parent, { _id, frete }, context, info) => {
      return new Promise((resolve, reject) => {
        Frete.findByIdAndUpdate(
          _id,
          { $set: { ...frete } },
          { new: true }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteFrete: async (parent, { _id }, context, info) => {
      try {
        // searching for creator of the frete and deleting it from the list
        const frete = await Frete.findById(_id);
        const creator = await Company.findById(frete.empresa);
        if (!creator) {
          throw new Error("Company not found.");
        }
        const index = creator.fretes.indexOf(_id);
        if (index > -1) {
          creator.fretes.splice(index, 1);
        }
        await creator.save();
        return new Promise((resolve, reject) => {
          Frete.findByIdAndDelete(_id).exec((err, res) => {
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
    frete: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  },
  Frete: {
    empresa: async ({ empresa }, args, context, info) => {
      return await Company.findById(empresa);
    }
  }
};
