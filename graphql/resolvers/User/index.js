import User from "../../../server/models/User";

export default {
  Query: {
    user: async (parent, args, context, info) => {
      if (!_id && !email) throw new Error("Insert an param.");
      const user = await User.findOne(args).exec();
      if (!user) throw new Error("User not found.");
      return user;
    },
    users: async (parent, args, context, info) => {
      const users = await User.find({}).exec();
      return users.map(u => ({
        _id: u._id.toString(),
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        password: u.password,
        telephones: u.telephones,
        role: u.role,
        status: u.status
      }));
    }
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      const newUser = await new User({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        telephones: user.telephones,
        role: user.role,
        status: user.status
      });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateUser: async (parent, { _id, user }, context, info) => {
      const update = await Freight.updateOne({ _id }, user, {
        new: true
      }).exec();
      return update.ok ? true : false;
    },
    deleteUser: async (parent, { _id }, context, info) => {
      const update = await Freight.updateOne(
        { _id },
        { status: 1 },
        { new: true }
      ).exec();
      return update.ok ? true : false;
    }
  }
};
