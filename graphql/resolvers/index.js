import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Company from "./Company";
import Frete from "./Frete/";

const resolvers = [User, Company, Frete];

export default mergeResolvers(resolvers);
