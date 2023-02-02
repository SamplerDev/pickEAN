import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";
const FormatError = require ('easygraphql-format-error')  

export const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});


