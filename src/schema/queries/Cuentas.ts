import {GraphQLID, GraphQLList} from 'graphql'

 //importando esto me permite interactuar con la entidad/tabla
import { Cuentas } from '../../Entities/Cuentas'
import { Cuentastype } from '../../TypeDefs/Cuentas'



export const GETALL_CUENTAS = {

type: new GraphQLList(Cuentastype),

    async resolve(){
        const result = await Cuentas.find()
        console.log(result)
        return result
       

        


    }
}

export const GET_CUENTABYID = {

    type: Cuentastype,
    args:{
        id:{type:GraphQLID}    
    },
        async resolve(_:any,args:any){
            const result = await Cuentas.findOne({where:{id:args.id}});
            console.log(result);
            return result;
           

        }}