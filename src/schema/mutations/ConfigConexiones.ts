import {GraphQLString,GraphQLBoolean, GraphQLInt, GraphQLID} from 'graphql'
import { Apps } from '../../Entities/Apps'
//importando esto me permite interactuar con la entidad/tabla
import { ConfigConexiones } from '../../Entities/ConfigConexiones'
import { Cuentas } from '../../Entities/Cuentas'

import { MessageType } from '../../TypeDefs/MsgType'

export const CREATE_CONFIG_CONEX = {

    type: MessageType, //tipo de dato que devuelve
    args:{
        IdApp:{type: GraphQLID}, //en produccion esto es GraphQLInt
        IdCuenta:{type: GraphQLID}, //en produccion esto es GraphQLInt
        Tipo:{type: GraphQLString},
        User:{type: GraphQLString},
        Pwd:{type: GraphQLString},
        Odata:{type:GraphQLString},
        Deleted:{type:GraphQLBoolean},
        ConfirmIdCuenta:{type:GraphQLInt},
        ConfirmIdApp:{type:GraphQLInt}

    },
    async resolve(_:any,args:any){

        
        const {IdApp,IdCuenta,Tipo,User,Pwd,Odata,Deleted,ConfirmIdApp,ConfirmIdCuenta} = args
       
        
            const validacion2 = IdCuenta == ConfirmIdCuenta && IdApp == ConfirmIdApp ? true : false;
            if (validacion2) {
                const validacion3 = await Cuentas.findOne({ where: { id: args.IdCuenta } })
                if (validacion3) {
                    const validacion4 = await Apps.findOne({ where: { id: args.IdApp } })
                    if(validacion4){

                        const result=   await ConfigConexiones.insert({
                            IdApp: IdApp,
                            IdCuenta:IdCuenta,
                            Tipo: Tipo,
                            User: User,
                            Pwd: Pwd,
                            Odata: Odata,
                            Deleted:Deleted,
                            ConfirmIdApp:ConfirmIdApp,
                            ConfirmIdCuenta:ConfirmIdCuenta
                
                        })
                            console.log(result)
                            const AppName = await Apps.findOne({ where: { id: args.IdApp } })
                            const CuentaName = await Cuentas.findOne({ where: { id: args.idCuenta } })
                        return { 
                            success: true,
                            message: `La configuracion para la conexion para la app ${AppName?.Name}, cuenta ${CuentaName?.Name}
                            del tipo ${Tipo} con el usuario ${User} para el Odata ${Odata} con el id:${result.identifiers[0].id} `
                          }
                }else{
                  return{
                    success: false,
                    message: `el ID de la App que ingreso no existe `
                  }
                }
                  } else {
                      return {
                         success: false,
                         message: `el ID de la Cuenta que ingreso no existe `
                       }
                    }
            }       else {
                      return {
                            success: false,
                            message: 'la id app/cuenta no coincide con su confirmacion, reviselo '
                             }
              }
                           
    }
}


export const LOGIC_DELETECONEX= {
    
    type: GraphQLString,
    args: {
        id:{type:GraphQLID},
        Deleted:{type:GraphQLBoolean}
        
    },
    async resolve(_:any,{id,Deleted}:any){
    
        const conexFound = await ConfigConexiones.findOne({where: {id:id}})
        
        if(conexFound===null || conexFound.Deleted===true){
            return 'La conexion que quiere borrar no ha sido encontrada o ha sido borrada logicamente con anterioridad'
        }else{
         const response =   await ConfigConexiones.update({id},{
            id, 
            Deleted
                   } )

            console.log(response)
            return `La conexion con el id : ${id} ha sido eliminada exitosamente`;
            
        }
}
}


export const UPDATE_CONEX= {
    
    type: GraphQLString,
    args: {
        id:{type:GraphQLID},
        IdApp:{type: GraphQLInt}, //en produccion esto es GraphQLInt
        IdCuenta:{type: GraphQLString}, //en produccion esto es GraphQLInt
        Tipo:{type: GraphQLString},
        User:{type: GraphQLString},
        Pwd:{type: GraphQLString},
        Odata:{type:GraphQLString},
        Deleted:{type:GraphQLBoolean}
        
    },
    async resolve(_:any,{id,IdApp,IdCuenta,Tipo,User,Pwd,Odata,Deleted}:any){
    
        const configFound = await ConfigConexiones.findOne({where: {id:id}})
        
        if(configFound===null || configFound.Deleted===true){
            return 'La conexion que quiere borrar no ha sido encontrada o ha sido borrada logicamente con anterioridad'
        }else{
         const response =   await ConfigConexiones.update({id},{
            IdApp,
            IdCuenta,
            Tipo,
            User,
            Pwd,
            Odata, 
            Deleted
                   } )

            console.log(response)
            return `La conexion con el id : ${id} ha sido eliminada exitosamente`;
            
        }
}
}

