import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const FreteSchema = new Schema(
  {
    url: {
      type: String,
      unique: true,
      required: true
    },

    origem: {
      type: Schema.Types.ObjectId,
      ref: "Loc"
    },
    destino: {
      type: Schema.Types.ObjectId,
      ref: "Loc"
    },
    status: {
      type: Boolean,
      default: true
    },
    km: String,
    peso: String,
    preco: String,
    carga: String,
    km: String,
    especie: String,
    complemento: String,
    rastreamento: String,
    obs: String,
    veiculos: [{ type: String }],
    carrocerias: [{ type: String }],
    nextel: [{ type: String }],
    celular: [{ type: String }],
    fone: [{ type: String }],
    whatsapp: [{ type: String }],
    sac: [{ type: String }],

    empresa: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    }
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

export default mongoose.model("Frete", FreteSchema);
