import { GraphQLID, GraphQLList, GraphQLString } from 'graphql'

//importando esto me permite interactuar con la entidad/tabla
import { ConfigConexiones } from '../../Entities/ConfigConexiones'
import { ConfigConexType } from '../../TypeDefs/ConfigConexiones'

//import { AplicacionType } from '../../TypeDefs/Aplicacion'

export const GETALL_CONEXION = {

    type: new GraphQLList(ConfigConexType),

    async resolve() {
        const result = await ConfigConexiones.find()
        console.log(result)
        return result





    }
}


export const GET_CONEXBYID = {

    type: new GraphQLList(ConfigConexType),
    args:{
       Id:{type:GraphQLID}    
    },
        async resolve(_:any,args:any){
            const result = await ConfigConexiones.find({where:{id:args.Id}});
            console.log(result);
            return result;
           

        }


 }


 export const GET_CONFIGBYIDAPP = {

    type: new GraphQLList(ConfigConexType),
    args:{
        IdApp:{type:GraphQLID}    
    },
        async resolve(_:any,args:any){
            const result = await ConfigConexiones.find({where:{id:args.IdApp}});
            console.log(result);
            return result;
           

        }}

        
 export const GET_CONFIGBYIDCUENTA = {

    type: new GraphQLList(ConfigConexType),
    args:{
        IdCuenta:{type:GraphQLID}    
    },
        async resolve(_:any,args:any){
            const result = await ConfigConexiones.find({where:{IdCuenta:args.IdCuenta}});
            console.log(result);
            return result;
           

        }}

        export const GET_CONFIGBYUSER = {

            type: new GraphQLList(ConfigConexType),
            args:{
                User:{type:GraphQLString}    
            },
                async resolve(_:any,args:any){
                    const result = await ConfigConexiones.find({where:{User:args.User}});
                    console.log(result);
                    return result;
                   
        
                }}

  

