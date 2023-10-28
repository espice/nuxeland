import { GraphQLSchema } from "graphql";
import { builder } from "../builder";

// schema imports
import "./user";

export const schema: GraphQLSchema = builder.toSchema();
