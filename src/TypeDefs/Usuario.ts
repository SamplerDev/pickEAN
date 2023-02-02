import { GraphQLObjectType, GraphQLString,GraphQLID, GraphQLBoolean, GraphQLInt } from "graphql";
import { AppType } from "./Apps";

import { Cuentastype } from "./Cuentas";

export const UsuarioType = new GraphQLObjectType({

name: 'Usuario',
fields:{
    id:{type: GraphQLID},
    IdApp:{type: AppType},
    IdCuenta:{type: Cuentastype},
    Usuario:{type: GraphQLString},
   // Pwd:{type: GraphQLString},
    Admin:{type: GraphQLBoolean},
    ConfirmIdCuenta:{type:GraphQLInt},
    ConfirmIdApp:{type:GraphQLInt}
    

}
})