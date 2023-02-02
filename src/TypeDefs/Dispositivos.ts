import { GraphQLObjectType, GraphQLString,GraphQLID, GraphQLBoolean, GraphQLInt } from "graphql";
import { AppType } from "./Apps";
import { Cuentastype } from "./Cuentas";

export const DispositivosType = new GraphQLObjectType({

name: 'DispositivosType',
fields:{
    id:{type: GraphQLID},
    IdDispositivo:{type:GraphQLString},
    IdApp:{type: AppType},
    IdCuenta:{type: Cuentastype},
    Deleted:{type:GraphQLBoolean},
    ConfirmIdCuenta:{type:GraphQLInt},
    ConfirmIdApp:{type:GraphQLInt}
    

}

})