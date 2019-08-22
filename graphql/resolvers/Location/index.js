import Location from "../../../server/models/Location";

const convertJsonToDot = (obj, parent = [], keyValue = {}) => {
  for (let key in obj) {
    let keyPath = [...parent, key];
    if (obj[key] !== null && typeof obj[key] === "object") {
      Object.assign(keyValue, convertJsonToDot(obj[key], keyPath, keyValue));
    } else keyValue[keyPath.join(".")] = obj[key];
  }
  return keyValue;
};

export default {
  Query: {
    location: async (parent, { filter }, context, info) => {
      if (!filter) throw new Error("Insert a param.");
      const conditions = convertJsonToDot(filter);
      return await Location.findOne(conditions).exec();
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
