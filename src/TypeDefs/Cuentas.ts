import { GraphQLObjectType, GraphQLString,GraphQLID, GraphQLBoolean } from "graphql";

export const Cuentastype = new GraphQLObjectType({

name: 'Cuentas',
fields:{
    id:{type:GraphQLID},
    Name:{type: GraphQLString},
    Deleted:{type:GraphQLBoolean}
    
}

})