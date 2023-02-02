import { GraphQLObjectType, GraphQLString,GraphQLID, GraphQLBoolean, GraphQLInt } from "graphql";
import { AppType } from "./Apps";
import { Cuentastype } from "./Cuentas";
var GraphQLDate = require('graphql-date')

export const VigenciaLicenciaType = new GraphQLObjectType({

name: 'VigenciaLicencia',
fields:{
    id:{type: GraphQLID},
    IdApp:{type: AppType},
    IdCuenta:{type: Cuentastype},
    Vencimiento:{type:GraphQLDate},
    CantDisp:{type:GraphQLInt}
}

})