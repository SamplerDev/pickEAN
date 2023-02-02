import {GraphQLID, GraphQLInt, GraphQLList, GraphQLString} from 'graphql'

 //importando esto me permite interactuar con la entidad/tabla
import { VigenciaLicencia } from '../../Entities/VigenciaLicencia'
import { VigenciaLicenciaType } from '../../TypeDefs/VigenciaLicencia'
var GraphQLDate = require('graphql-date')


export const GETALL_VIGENCIAS = {

type: new GraphQLList(VigenciaLicenciaType),

    async resolve(){
        const result = await VigenciaLicencia.find()
        console.log(result)
        return result
       

        
    }
}

export const GET_LICENCIAS_BYID = {

    type: VigenciaLicenciaType,
    args:{
       id:{type:GraphQLID}    
    },
        async resolve(_:any,args:any){
            const result = await VigenciaLicencia.findOne({where:{id:args.id}});
            console.log(result);
            return result;
           

        }
    
        }
    

            
        
        export const GET_LICENCIAS_BYVENCIMIENTO = {

    type: new GraphQLList(VigenciaLicenciaType),
    args:{
       vencimiento:{type:GraphQLString}    
    },
        async resolve(_:any,args:any){
            const result = await VigenciaLicencia.find({where:{Vencimiento:args.vencimiento}});
            console.log(result);
            return result;
           

        }
    
        }
    


        export const GET_LICENCIAS_BYCANTDISP = {

            type: new GraphQLList(VigenciaLicenciaType),
            args:{
               CantDisp:{type:GraphQLInt}    
            },
                async resolve(_:any,args:any){
                  
                    const result = await VigenciaLicencia.find({where:{CantDisp:args.CantDisp}});
                    console.log(result);
                    return result;
                   
        
                }
            
                }



        