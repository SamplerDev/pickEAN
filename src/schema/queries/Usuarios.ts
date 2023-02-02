import {GraphQLID, GraphQLInt, GraphQLList, GraphQLString} from 'graphql'

 //importando esto me permite interactuar con la entidad/tabla
import { Usuarios } from '../../Entities/Usuario'
import { UsuarioType } from '../../TypeDefs/Usuario'



export const GETALL_USUARIOS = {

type: new GraphQLList(UsuarioType),

    async resolve(){
        const result = await Usuarios.find()
        console.log(result)
        return result
       

        


    }
}

export const GET_USER_BYID = {
    type: UsuarioType,
    args:{
       id:{type:GraphQLID}    
    },
        async resolve(_:any,args:any){
            const result = await Usuarios.findOne({where:{id:args.id}});
            console.log(result);
            return result;
           

        }


 }


 export const GET_USER_BYCUENTA = {
    type:new GraphQLList(UsuarioType),
    args:{
       id:{type:GraphQLInt}    
    },
        async resolve(_:any,args:any){
            const result = await Usuarios.find({where:{ConfirmIdCuenta:args.id}});
            console.log(result);
            return result;
           

        }


 }

 export const GET_USER_BYAPP = {
    type:new GraphQLList(UsuarioType),
    args:{
       id:{type:GraphQLInt}    
    },
        async resolve(_:any,args:any){
            const result = await Usuarios.find({where:{ConfirmIdApp:args.id}});
            console.log(result);
            return result;
           

        }


 }



 export const GET_USER_BYUSRNAME = {
    type:new GraphQLList(UsuarioType),
    args:{
       UsrName:{type:GraphQLString}    
    },
        async resolve(_:any,args:any){
            const result = await Usuarios.find({where:{Usuario:args.UsrName}});
            console.log(result);
            return result;
           

        }


 }