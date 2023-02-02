import {GraphQLBoolean, GraphQLID, GraphQLString} from 'graphql'

//importando esto me permite interactuar con la entidad/tabla
import { Cuentas } from '../../Entities/Cuentas'
import {Cuentastype} from '../../TypeDefs/Cuentas'

export const CREATE_CUENTAS = {

type: Cuentastype,
args:{
   Name: {type: GraphQLString},
   

},
    async resolve(_:any,args:any){
        
        const {Name} = args

     const result =   await Cuentas.insert({
            Name: Name,
            
        })
            console.log(result)

        return { ...args,id:result.identifiers[0].id}


    }
}

export const LOGIC_DELETECUENTA= {
    
    type: GraphQLString,
    args: {
        id:{type:GraphQLID},
        Deleted:{type:GraphQLBoolean}
        
    },
    async resolve(_:any,{id,Deleted}:any){
    
        const cuentaFound = await Cuentas.findOne({where: {id:id}})
        
        if(cuentaFound===null || cuentaFound.Deleted===true){
            return 'La cuenta que quiere borrar no ha sido encontrada o ha sido borrada logicamente con anterioridad'
        }else{
         const response =   await Cuentas.update({id},{
            id, 
            Deleted
                   } )

            console.log(response)
            return `La cuenta con el id : ${id} ha sido eliminada exitosamente`;
            
        }
}
}


export const UPDATE_CUENTA= {
    
    type: GraphQLString,
    args: {
        id:{type:GraphQLID},
        idCuenta:{type:GraphQLString},
        Deleted:{type:GraphQLBoolean}
        
    },
    async resolve(_:any,{id,Name,Deleted}:any){
    
        const cuentaFound = await Cuentas.findOne({where: {id:id}})
        
        if(cuentaFound===null || cuentaFound.Deleted===true){
            return 'La cuenta que quiere borrar no ha sido encontrada o ha sido borrada logicamente con anterioridad'
        }else{
         const response =   await Cuentas.update({id},{
            
            Name, 
            Deleted
                   } )

            console.log(response)
            return `La cuenta con el id : ${id} ha sido eliminada exitosamente`;
            
        }
}
}


