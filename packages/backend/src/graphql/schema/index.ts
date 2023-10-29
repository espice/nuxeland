import { GraphQLSchema } from "graphql";
import { builder } from "../builder";

// schema imports
import "./user";
import "./transaction";

export const schema: GraphQLSchema = builder.toSchema();
