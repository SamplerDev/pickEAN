import { GraphQLString, GraphQLBoolean, GraphQLEnumType, GraphQLInt, GraphQLID, GraphQLInputObjectType } from 'graphql'
import { Apps } from '../../Entities/Apps'
import { Cuentas } from '../../Entities/Cuentas'

import { VigenciaLicencia } from '../../Entities/VigenciaLicencia'
import { MessageType } from '../../TypeDefs/MsgType'
import { VigenciaLicenciaType } from '../../TypeDefs/VigenciaLicencia'


export const CREATE_VIGENCIA_LICENCIA = {

    type: MessageType, //tipo de dato que devuelve
    args: {
        IdApp: { type: GraphQLID },
        IdCuenta: { type: GraphQLID },
        Vencimiento: { type: GraphQLString },
        CantDisp: { type: GraphQLInt },
        ConfirmIdApp: { type: GraphQLID },
        ConfirmIdCuenta: { type: GraphQLID }

    },
    async resolve(_: any, args: any) {



        const { IdApp, IdCuenta, Vencimiento, CantDisp, ConfirmIdApp, ConfirmIdCuenta } = args

        console.log(IdCuenta, ConfirmIdCuenta)

        if (IdCuenta === ConfirmIdCuenta) {

            if (IdApp === ConfirmIdApp) {
                const appFound = await Apps.findOne({ where: { id: IdApp } })
                if (appFound) {
                    const cuentaFound = await Cuentas.findOne({ where: { id: IdApp } })
                    if (cuentaFound) {

                        const result = await VigenciaLicencia.insert({
                            IdApp: IdApp,
                            IdCuenta: IdCuenta,
                            ConfirmIdApp: ConfirmIdApp,
                            ConfirmIdCuenta: ConfirmIdCuenta,
                            Vencimiento: Vencimiento,
                            CantDisp: CantDisp
                        })
                        console.log(result)

                        return {
                            message: `la vigencia para la app ${appFound?.Name} de la cuenta ${cuentaFound?.Name} de hasta ${CantDisp} dispositivos de conexion, con fecha de vencimiento al ${Vencimiento}, ha sido creada exitosamente`,
                            success: true
                        }
                    } else {
                        return {
                            message: `La cuenta ingresada no existe, revisela`,
                            success: false
                        }

                    }
                } else {
                    return {
                        message: `El id de la app ingresado no existe `,
                        success: false
                    }
                }
            } else {
                return {
                    message: `El id de la App no coincide con su confirmacion, reviselo `,
                    success: false
                }

            }
        } else {
            return {
                message: `El id de la cuenta no coincide con su confirmacion, reviselo `,
                success: false
            }


        }

    }
}


export const LOGIC_DELETEDVIGENCI = {


    type: GraphQLString,
    args: {
        id: { type: GraphQLID },
        Deleted: { type: GraphQLBoolean }

    },
    async resolve(_: any, { id }: any) {

        const vigFound = await VigenciaLicencia.findOne({ where: { id: id } })

        if (vigFound === null || vigFound.Deleted === true) {
            return 'La cuenta que quiere borrar no ha sido encontrada o ha sido borrada logicamente con anterioridad'
        } else {
            const response = await VigenciaLicencia.update({ id }, {

                Deleted: true
            })

            console.log(response)
            return `La licencia con el id : ${id} ha sido eliminada exitosamente`;

        }
    }


}

export const UPDATE_LICENCIA = {


    type: MessageType,
    args: {
        id: { type: GraphQLID },
        IdApp: { type: GraphQLInt },
        IdCuenta: { type: GraphQLInt },
        input: {
            type: new GraphQLInputObjectType({
                name: "LicenciaInput",
                fields: () => ({
                    IdApp: { type: GraphQLInt },
                    IdCuenta: { type: GraphQLInt},
                    Vencimiento: { type: GraphQLString },
                    CantDisp: { type: GraphQLInt },

                }),
            }),
        },


    },
    async resolve(_: any, { id, IdApp, IdCuenta, input }: any) {
          
        
        const licFound = await VigenciaLicencia.findOne({ where: { id: id } })
        if (licFound){
            
            if (licFound.Deleted === false) {
                const cuentaFound = await Cuentas.findOne({ where: { id: IdCuenta } })
            
                if (cuentaFound) {
                    const appFound = await Apps.findOne({ where: { id: IdApp } })
                    if (appFound) {
                        
                        if(licFound.IdCuenta.id===IdCuenta){
                            
                            if(licFound.IdApp.id===IdApp){


                        const response = await VigenciaLicencia.update({ id}, {
                            IdApp: input.IdApp,
                            IdCuenta: input.IdCuenta,
                            Vencimiento: input.vencimiento,
                            CantDisp: input.CantDisp,
                            ConfirmIdApp:input.IdApp,
                            ConfirmIdCuenta:input.IdCuenta
                        })

                        console.log(response)
                        return {
                            message: `La licencia ha sido actualizada `,
                            success: true
                        }}else{
                            return{
                                message:`El id correspondiente a la App es incorrecto, reviselo`
                            }
                        }
                    }else{
                        return {
                            message: `El id correspondiente a la cuenta es incorrecto, reviselo `,
                            success: true

                    }
                }


                    } else {
                        return {
                            message: `el id de la App ingresado no existe en base de datos, reviselo`,
                            success: false
                        }

                    }
                } else {
                    return {
                        message: `el id de la cuenta ingresado no existe en base de datos, reviselo`,
                        succes: false
                    }
                }
            } else {
                return {
                    message: `La licencia para los datos ha sufrido un borrado logico anteriormente`,
                    success: false
                }

            }
        } else {

            return {
                message: `La licencia para los datos ingresados no existe, revisela`,
                success: false
            }
        }


    }
}
