import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Company from "./Company";
import Freight from "./Freight/";
import Location from "./Location";

const resolvers = [User, Company, Freight, Location];

export default mergeResolvers(resolvers);
