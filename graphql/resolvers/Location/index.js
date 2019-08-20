import Location from "../../../server/models/Location";
import {
  buildMongoConditionsFromFilters,
  FILTER_CONDITION_TYPE
} from "@entria/graphql-mongo-helpers";

const LocationFilterMapping = {
  code: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  city: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1
  },
  stateuf: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "state.uf"
  },
  statename: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    key: "state.name"
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
  }
};
