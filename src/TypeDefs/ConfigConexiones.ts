import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } from "graphql";
import { Apps } from "../Entities/Apps";
import { AppType } from "./Apps";
import { Cuentastype } from "./Cuentas";

export const ConfigConexType = new GraphQLObjectType({

    name: 'ConfigConex',
    fields: {
        id: { type: GraphQLID },
        IdApp: { type: AppType },//en produccion esto es GraphQLInt
        IdCuenta: { type: Cuentastype }, //en produccion esto es GraphQLInt
        Tipo: { type: GraphQLString },
        User: { type: GraphQLString },
        Pwd: { type: GraphQLString },
        Odata: { type: GraphQLString },
        ConfirmIdCuenta:{type:GraphQLInt},
        ConfirmIdApp:{type:GraphQLInt}

    }

})