
import {GraphQLSchema, GraphQLObjectType} from 'graphql'
import { CREATE_APP, LOGIC_DELETEAPP, UPDATE_APP } from './mutations/Apps'
import { CREATE_CONFIG_CONEX, LOGIC_DELETECONEX, UPDATE_CONEX } from './mutations/ConfigConexiones'
import { CREATE_CUENTAS, LOGIC_DELETECUENTA, UPDATE_CUENTA } from './mutations/Cuentas'
import { CREATE_DISPOSITIVOS, LOGIC_DELETEDISP, UPDATE_DISP } from './mutations/Dispositivos'
import { CREATE_USER, LOGIC_DELETEUSER, UPDATE_USER, UPDATE_USER_PASSWORD } from './mutations/Usuarios'
import { CREATE_VIGENCIA_LICENCIA, LOGIC_DELETEDVIGENCI, UPDATE_LICENCIA } from './mutations/VigenciaLicencia'
import { GETALL_APPLICACION, GET_APPBYNAME, GET_APPLICACIONBYTYPE,GET_APPBYID } from './queries/Apps'
import { GETALL_CONEXION, GET_CONEXBYID, GET_CONFIGBYIDAPP, GET_CONFIGBYUSER } from './queries/ConfigConexiones'
import { GETALL_CUENTAS, GET_CUENTABYID } from './queries/Cuentas'
import { GETALL_DISPOSITIVOS,  GET_DISPOBYAPPID,  GET_DISPOBYCUENTAID,GET_DISPOSITIVOBYID, GET_DISPOSITIVOBYIDDISP } from './queries/Dispositivos'
import { GETALL_USUARIOS, GET_USER_BYAPP, GET_USER_BYCUENTA, GET_USER_BYID, GET_USER_BYUSRNAME } from './queries/Usuarios'
import {  GETALL_VIGENCIAS, GET_LICENCIAS_BYCANTDISP, GET_LICENCIAS_BYID, GET_LICENCIAS_BYVENCIMIENTO } from './queries/VigenciaLicencia'


const RootQuery= new GraphQLObjectType({

name:'RootQuery',
fields: {

    //Querys para la entidad aplicaciones 
    getAllApps: GETALL_APPLICACION,
    getAppByName: GET_APPBYNAME,
    getAplicacionByType:GET_APPLICACIONBYTYPE,
    getAppByID: GET_APPBYID,
    
     // Querys para la entidad ConfigConexiones
    getAllConex: GETALL_CONEXION,
    getConexByID:GET_CONEXBYID,
    getConexByIdApp:GET_CONFIGBYIDAPP,
    getConexByUser:GET_CONFIGBYUSER,

     //Querys para las cuentas
    getAllCuentas: GETALL_CUENTAS,
    getCuentaByID:GET_CUENTABYID,

    //Querys para los dispositivos
    getAllDispositivos: GETALL_DISPOSITIVOS,
    getDispositivoByID: GET_DISPOSITIVOBYID,
    getDispoByIdDispo: GET_DISPOSITIVOBYIDDISP,
    getDispoByCuentaID: GET_DISPOBYCUENTAID,
    getDispoByAppID:GET_DISPOBYAPPID,
    

    //Querys para los usuarios
    getAllUsuarios: GETALL_USUARIOS,
    getUsrById: GET_USER_BYID,
    getUsrByCuenta: GET_USER_BYCUENTA,
    getUsrByApp:GET_USER_BYAPP,
    getUsrByUsrName: GET_USER_BYUSRNAME,



    //
    getAllLicencias:GETALL_VIGENCIAS,
    getLicenciaById: GET_LICENCIAS_BYID,
    getLicenciasVencimiento: GET_LICENCIAS_BYVENCIMIENTO,
    getLicenciasByCantDisp: GET_LICENCIAS_BYCANTDISP,

    

}


})

const Mutation = new GraphQLObjectType({

    name:'Mutation',
    fields:{
        
        createUsr: CREATE_USER,
        logicDeleteUsr: LOGIC_DELETEUSER,
        updateUsr:UPDATE_USER,
        UpdateUserPass: UPDATE_USER_PASSWORD,

        createApp: CREATE_APP,
        logicDeleteApp: LOGIC_DELETEAPP,
        updateApp: UPDATE_APP,


        createConfigConex: CREATE_CONFIG_CONEX,
        logicDeleteConfig: LOGIC_DELETECONEX,
        updateConex: UPDATE_CONEX,


        createCuenta: CREATE_CUENTAS,
        logicDeleteCuenta: LOGIC_DELETECUENTA,
        updateCuenta: UPDATE_CUENTA,

        createVigenciaLicencia: CREATE_VIGENCIA_LICENCIA,
        logicDeleteLicencia: LOGIC_DELETEDVIGENCI,
        updateVigencia:UPDATE_LICENCIA,

        createDispositivos: CREATE_DISPOSITIVOS,
        logicDeleteDisp:LOGIC_DELETEDISP,
        updateDisp:UPDATE_DISP

       
        
    },

}
)

export const schema = new GraphQLSchema({

query: RootQuery,
mutation: Mutation

})