import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ConfigConexiones } from './ConfigConexiones';
import { Dispositivos } from './Dispositivos';
import { Usuarios } from './Usuario';
import { VigenciaLicencia } from './VigenciaLicencia';

@Entity()
export class Cuentas extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    Name!: String;

    @Column('bit', { default: false })
    Deleted!: Boolean;
    
    @OneToMany(()=>Dispositivos,(dispositivos)=>{dispositivos.IdCuenta})
    dispositivos!:Dispositivos[];

    @OneToMany(() => Usuarios,(usuarios) => usuarios.IdCuenta)
    Usuarios!:Usuarios[];
//

    @OneToMany(()=>ConfigConexiones,(configconexiones) =>{configconexiones.IdCuenta})
    ConfigConexiones!: ConfigConexiones[];

    @OneToMany(()=>VigenciaLicencia,(vigenciaLicencia) =>{vigenciaLicencia.IdCuenta})
    vigenciaLicencia!: VigenciaLicencia[];

}