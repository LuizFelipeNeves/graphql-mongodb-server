import Location from "../../../server/models/Location";
import {
  buildMongoConditionsFromFilters,
  FILTER_CONDITION_TYPE
} from "@entria/graphql-mongo-helpers";

const stringToRegexQuery = val => {
  return { $regex: new RegExp(val) };
};

const LocationFilterMapping = {
  code: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  city: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  state: {
    uf: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      key: "state.uf"
    }
  },
  state: {
    name: {
      type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
      key: "state.name"
    }
  }
};

export default {
  Query: {
    location: async (parent, { filter }, context, info) => {
      if (!filter) throw new Error("Insert a param.");
      const filterResult = buildMongoConditionsFromFilters(
        null,
        filter,
        LocationFilterMapping
      );
      return await Location.findOne(filterResult.conditions).exec();
    },
    locations: async (parent, { page, perpage, fiter }, context, info) => {
      const filterResult = buildMongoConditionsFromFilters(
        null,
        fiter,
        LocationFilterMapping
      );
      const locations = await Location.find(filterResult.conditions)
        .skip(perpage * (page - 1))
        .limit(perpage)
        .exec();

      const totalcount = await Location.countDocuments(
        filterResult.conditions
      ).exec();
      const hasnextpage = page < totalcount / perpage;

      return {
        totalcount,
        hasnextpage,
        locations: locations.map(u => ({
          _id: u._id.toString(),
          code: u.code,
          city: u.city,
          state: u.state,
          location: u.location
        }))
      };
    }
  },
  Mutation: {
    createLocation: async (parent, { location }, context, info) => {
      const newLocation = await new Location({
        code: location.code,
        city: location.city,
        state: location.state,
        location: location.location
      });
      return new Promise((resolve, reject) => {
        newLocation.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateLocation: async (parent, { _id, location }, context, info) => {
      return new Promise((resolve, reject) => {
        Location.findByIdAndUpdate(
          _id,
          { $set: { ...location } },
          { new: true }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteLocation: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Location.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
