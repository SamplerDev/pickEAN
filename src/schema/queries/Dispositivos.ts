import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from 'graphql'

//importando esto me permite interactuar con la entidad/tabla

import { Dispositivos } from '../../Entities/Dispositivos'

import { DispositivosType } from '../../TypeDefs/Dispositivos'



export const GETALL_DISPOSITIVOS = {

    type: new GraphQLList(DispositivosType),

    async resolve() {
        const result = await Dispositivos.find()
        console.log(result)
        return result





    }
}


export const GET_DISPOSITIVOBYID = {

    type: DispositivosType,
    args: {
        id: { type: GraphQLInt }
    },
    async resolve(_: any, args: any) {
        //how find Dispositivo by IdCuenta Field?
        const result = await Dispositivos.findOne({ where: {id: args.id } });
        console.log(result);

        return result;


    }
}

export const GET_DISPOSITIVOBYIDDISP = {

    type: DispositivosType,
    args: {
        IdDispo: { type: GraphQLString }
    },
    async resolve(_: any, args: any) {
        const result = await Dispositivos.findOne({ where: { IdDispositivo: args.IdDispo } });
        console.log(result);
        return result;


    }
}

export const GET_DISPOBYCUENTAID = {

    type: new GraphQLList(DispositivosType),
    args: {
        idCuenta: { type: GraphQLInt }
    
    },
    async resolve(_: any, args: any) {
        console.log(args.id)
        const result = await Dispositivos.find({where:{ConfirmIdCuenta:args.idCuenta}});
        console.log(result);
        return result;


    }
}



export const GET_DISPOBYAPPID = {


    type: new GraphQLList(DispositivosType),
    args: {
        idApp: { type: GraphQLInt }
    
    },
    async resolve(_: any, args: any) {
        console.log(args.id)
        const result = await Dispositivos.find({where:{ConfirmIdApp:args.idApp}});
        console.log(result);
        return result;


    }


}