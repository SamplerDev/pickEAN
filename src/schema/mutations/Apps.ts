import {GraphQLBoolean, GraphQLID, GraphQLString} from 'graphql'

import { Apps } from '../../Entities/Apps' //importando esto me permite interactuar con la entidad/tabla
import { AppType } from '../../TypeDefs/Apps'

//import { AplicacionType } from '../../TypeDefs/Aplicacion'

export const CREATE_APP = {

type: AppType,
args:{
   Name: {type: GraphQLString},
   Type: {type: GraphQLString},
   Deleted:{type:GraphQLBoolean}

},
    async resolve(_:any,args:any){
        
        const {Name,Type,Deleted} = args

     const result =   await Apps.insert({
            Name: Name,
            Type:Type,
            Deleted:Deleted
            
        })
            console.log(result)

        return { ...args,id:result.identifiers[0].id}


    }
}


export const LOGIC_DELETEAPP= {
    
    type: GraphQLString,
    args: {
       id: {type: GraphQLID},
       Deleted:{type: GraphQLBoolean}
        
    },
    async resolve(_:any,{id,Deleted}:any){
    
        const appFound = await Apps.findOne({where: {id:id}})
        
        if(appFound===null || appFound.Deleted===true){
            return 'La App que quiere borrar no ha sido encontrada o ha sido borrada logicamente con anterioridad'
        }else{
         const response =   await Apps.update({id},{ 
            Deleted
                   } )

            console.log(response)
            return `La App con el id : ${id} ha sido eliminada exitosamente`;
            
        }
}
}


export const UPDATE_APP= {
    
    type: GraphQLString,
    args: {
    
        id:{type:GraphQLID},
        Name:{type: GraphQLString},
        Type:{type: GraphQLString},
        Deleted:{type: GraphQLBoolean}
        
    },
    
    async resolve(_:any,{
        id,
        Name,
        Type,
        Deleted

             }:any){
    
        const appFound = await Apps.findOne({where: {id:id}})
        
        if(appFound===null){
            return 'El viaje que quiere modificar no existe'
        }else{
         const response =   await Apps.update({id},{

            Name,
            Type,
            Deleted
            
                  } )

            console.log(response)
            return `La App con el id: ${id} ha sido modificada exitosamente`;
            
        }

     

            

        
    
}
}
