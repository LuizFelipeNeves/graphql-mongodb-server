import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true
    },
    last_name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    telephones: [Number],
    role: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: 0
    }
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

UserSchema.pre("save", async function(next) {
  /*
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  */
  next();
});

export default mongoose.model("User", UserSchema);
