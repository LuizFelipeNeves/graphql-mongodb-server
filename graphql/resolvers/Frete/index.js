import Frete from "../../../server/models/Frete";
import Company from "../../../server/models/Company";
import { transformFrete } from "../merge";

export default {
  Query: {
    frete: async (parent, { _id }, context, info) => {
      return await Frete.findOne({ _id }).exec();
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
        .populate()
        .exec();

      const totalcount = await Frete.countDocuments(query);
      const hasnextpage = page < totalcount / perpage;

      return {
        totalcount,
        hasnextpage,
        fretes: res.map(u => ({
          _id: res._id.toString(),
          url: res.url,
          origem: res.origem,
          destino: res.destino,
          status: res.status,
          km: res.km,
          preco: res.preco,
          peso: res.peso,
          carga: res.carga,
          especie: res.especie,
          complemento: res.complemento,
          rastreamento: res.rastreamento,
          obs: res.obs,
          veiculos: res.veiculos,
          carrocerias: res.carrocerias,
          nextel: res.nextel,
          celular: res.celular,
          fone: res.fone,
          whatsapp: res.whatsapp,
          sac: res.sac,
          empresa: res.empresa
        }))
      };
    }
  },
  Mutation: {
    createFrete: async (parent, { frete }, context, info) => {
      const json = ({
        url,
        origem,
        destino,
        status,
        km,
        preco,
        peso,
        carga,
        especie,
        complemento,
        rastreamento,
        obs,
        veiculos,
        carrocerias,
        nextel,
        celular,
        fone,
        whatsapp,
        sac,
        empresa
      } = frete);

      const newFrete = await Frete.create(json);
      try {
        // const result = await newFrete.save();
        const result = await new Promise((resolve, reject) => {
          newFrete.save((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
        const createdFrete = transformFrete(result);
        const creator = await Company.findById(frete.empresa);

        if (!creator) {
          throw new Error("Company not found.");
        }
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
