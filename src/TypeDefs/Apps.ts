import { GraphQLObjectType, GraphQLString,GraphQLID, GraphQLBoolean } from "graphql";

export const AppType = new GraphQLObjectType({

name: 'Aplicacion',
fields:{
    id:{type:GraphQLID},
    Name:{type: GraphQLString},
    Type:{type: GraphQLString},
    Deleted:{type:GraphQLBoolean}
   
}

})