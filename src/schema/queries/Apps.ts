import {GraphQLID, GraphQLList, GraphQLString} from 'graphql'
import { type } from 'os'

import { Apps } from '../../Entities/Apps' //importando esto me permite interactuar con la entidad/tabla
import { AppType } from '../../TypeDefs/Apps'

export const GETALL_APPLICACION = {

type: new GraphQLList(AppType),

    async resolve(){
        const result = await Apps.find()
        console.log(result)
        return result
       

        


    }
}

export const GET_APPBYNAME = {

    type: new GraphQLList(AppType),
    args:{
        Name:{type:GraphQLString}    
    },
        async resolve(_:any,args:any){
            const result = await Apps.find({where:{Name:args.Name}});
            console.log(result);
            return result;
           

        }}


        export const GET_APPLICACIONBYTYPE = {

            type: new GraphQLList(AppType),
            args:{
                Type:{type:GraphQLString}    
            },
                async resolve(_:any,args:any){
                    const result = await Apps.find({where:{Type:args.Type}});
                    console.log(result);
                    return result;
                   
        
                }}

     export const GET_APPBYID = {

        type: AppType,
        args:{
           id:{type:GraphQLID}    
        },
            async resolve(_:any,args:any){
                const result = await Apps.findOne({where:{id:args.id}});
                console.log(result);
                return result;
               
    
            }


     }