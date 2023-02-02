import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'
import { DataSource, getManager } from 'typeorm'
import { Apps } from '../../Entities/Apps'
import { Cuentas } from '../../Entities/Cuentas'
import { Dispositivos } from '../../Entities/Dispositivos'
import { VigenciaLicencia } from '../../Entities/VigenciaLicencia'
import { MessageType } from '../../TypeDefs/MsgType'

export const CREATE_DISPOSITIVOS = {

    type: MessageType, //tipo de dato que devuelve
    args: {
        IdDispositivo: { type: GraphQLString },
        IdApp: { type: GraphQLInt },
        IdCuenta: { type: GraphQLInt },
        ConfirmIdCuenta: { type: GraphQLInt },
        ConfirmIdApp: { type: GraphQLInt },

    },
    async resolve(_: any, args: any) {

        const { IdDispositivo, IdApp, IdCuenta, ConfirmIdCuenta, ConfirmIdApp } = args
        const validacion1 = await Dispositivos.findOne({ where: { IdDispositivo: args.IdDispositivo } })//({ where: { IdDispositivo: args.IdDispositivo } });


        if (!validacion1) {
            const validacion2 = IdCuenta === ConfirmIdCuenta && IdApp === ConfirmIdApp ? true : false;
            if (validacion2) {
                const validacion3 = await Cuentas.findOne({ where: { id: IdCuenta } })

                if (validacion3) {
                    const validacion4 = await Apps.findOne({ where: { id: IdApp } })

                    if (validacion4) {


                        const dispoAct = await VigenciaLicencia.findOne({ where: { IdCuenta: args.IdCuenta, IdApp: args.IdApp } })


                        if (dispoAct!.CantDisp > dispoAct!.CantDispAct) {

                            const disspoAdd = dispoAct!.CantDispAct + 1


                            const result = await Dispositivos.insert({
                                IdDispositivo: IdDispositivo,
                                IdApp: IdApp,
                                IdCuenta: IdCuenta,
                                ConfirmIdCuenta: ConfirmIdCuenta,
                                ConfirmIdApp: ConfirmIdApp

                            })

                            const addDisp = await VigenciaLicencia.update({ IdCuenta, IdApp }, {
                                CantDispAct: disspoAdd
                            })


                            console.log(dispoAct?.CantDisp, dispoAct?.CantDispAct, dispoAct!.CantDisp > dispoAct!.CantDispAct, 'esto es lo del log')

                            const AppName = await Apps.findOne({ where: { id: args.IdApp } })
                            const CuentaName = await Cuentas.findOne({ where: { id: args.idCuenta } })
                            return {
                                success: true,
                                message: `El dispositivo con el identificador :${IdDispositivo} fue cargado correctamente con el id : ${result.identifiers[0].id} para la App ${AppName?.Name} de la cuenta ${CuentaName?.Name} `
                                //...args,id:result.identifiers[0].id
                            }
                        } else {
                            return {
                                success: true,
                                message: `La cantidad de dispositivos disponibles para su cuenta ya ha sido alcanzada, de de baja uno o amplie la licencia comunicandose con el proveedor `
                                //...args,id:result.identifiers[0].id
                            }

                        }
                    } else {
                        return {
                            success: false,
                            message: `el ID de la App que ingreso no existe `
                        }
                    }
                } else {
                    return {
                        success: false,
                        message: `el ID de la App que ingreso no existe `
                    }
                }
            } else {
                return {
                    success: false,
                    message: 'la id app/cuenta no coincide con su confirmacion, reviselo '
                }
            }
        } else {
            return {
                success: false,
                message: ' El dispositivo que desea cargar ya se encuenta registrado '
            }
        }
    }
}



export const LOGIC_DELETEDISP = {


    type: MessageType,
    args: {
        id: { type: GraphQLInt },
        IdDispositivo: { type: GraphQLString },
        IdApp: { type: GraphQLInt },
        IdCuenta: { type: GraphQLInt }

    },
    async resolve(_: any, args: any) {

        const { id, IdDispositivo, Deleted, IdApp, IdCuenta } = args

        const dispFound = await Dispositivos.findOne({ where: { IdDispositivo: args.IdDispositivo } })

        if (dispFound) {

            if (dispFound.Deleted === false) {
                 console.log(dispFound,id)
                if (dispFound.id === id) {

                    const dispAct = await VigenciaLicencia.findOne({ where: { IdApp: args.IdApp, IdCuenta: args.IdCuenta } })

                    const disspoDel = dispAct!.CantDispAct - 1

                    const response = await Dispositivos.update({ id, IdDispositivo }, {

                        Deleted: true

                    })

                
                    const response2 = await VigenciaLicencia.update({ IdCuenta, IdApp }, {

                        CantDispAct: disspoDel

                    })

                    console.log(response)
                    return {
                        message: `El dispositicon el idenntificador : ${args.IdDispositivo} ha sido dado de baja exitosamente`,
                        success: true
                    };
                }
                else {
                    return {
                        message: `El id en base de datos del dispositicon el idenntificador : ${args.IdDispositivo} no coincide con el id ingresado`,
                        success: true
                    }
                }
            } else {
                return {
                    message: `El dispositicon el idenntificador : ${args.IdDispositivo} ha sido dado de baja anteriormente`,
                    success: true
                }
            }


        } else {
            return {
                message: `El dispositicon el identificador : ${args.IdDispositivo} no ha sido encontrado`,
                success: true
            };


        }




    }


}



export const UPDATE_DISP = {


    type: GraphQLString,
    args: {
        id: { type: GraphQLID },
        IdDispositivo: { type: GraphQLString },
        IdApp: { type: GraphQLString },
        IdCuenta: { type: GraphQLString }
    },
    async resolve(_: any, { id, IdDispositivo, IdApp, IdCuenta, Deleted }: any) {

        const dispFound = await Dispositivos.findOne({ where: { id: id } })

        if (dispFound === null || dispFound.Deleted === true) {
            return 'El dispositivo que quiere modificar no ha sido encontrada o ha sido borrado logicamente con anterioridad'
        } else {
            const response = await Dispositivos.update({ id }, {
                id,
                IdApp,
                IdDispositivo,
                IdCuenta,
                Deleted
            })

            console.log(response)
            return `El dispositivo con el id : ${id} y el identificador ${IdDispositivo} ha sido eliminado exitosamente`;

        }
    }


}




