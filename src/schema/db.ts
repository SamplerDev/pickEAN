import "reflect-metadata"
import { DataSource } from "typeorm"
import { Apps } from "../Entities/Apps"
import { ConfigConexiones } from "../Entities/ConfigConexiones"
import { Cuentas } from "../Entities/Cuentas"
import { Dispositivos } from "../Entities/Dispositivos"
import { Usuarios } from "../Entities/Usuario"
import { VigenciaLicencia } from "../Entities/VigenciaLicencia"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: /*"DESKTOP-2MP6O75"*/ "artech-net.dyndns.org",
    port: 1433,
    username: /*"sa",*/"pescar",
    password: /*"1234" ,*/"Pescar2022",
    database: "Pickean",
    entities: [Apps,ConfigConexiones,Cuentas,Dispositivos,Usuarios,VigenciaLicencia],
    synchronize: true,
    logging: true,
    options: {
        encrypt:false,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
    }
   
})



