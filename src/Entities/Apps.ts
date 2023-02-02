import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ConfigConexiones } from './ConfigConexiones';
import { Dispositivos } from './Dispositivos';
import { Usuarios } from './Usuario';


@Entity()
export class Apps extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    Name!: String;

    
    @Column()
    Type!: String;

    @Column('bit', { default: false })
    Deleted!: Boolean;

    @OneToMany(()=>ConfigConexiones,(configconexiones) =>{configconexiones.IdApp},)
    configconexiones!: ConfigConexiones[];

    @OneToMany(()=>Dispositivos,(dispositivos) =>{dispositivos.IdApp})
    Dispositivos!: Dispositivos[];

    @OneToMany(()=>Usuarios,(usuarios) =>{usuarios.IdApp},{})
    Usuarios!: Usuarios[];
    






    /*
    @OneToOne(() => Dispositivos, (dispositivos) => dispositivos.IdApp,
    {nullable: false})
    @OneToOne(() => VigenciaLicencia, (vigencia) => vigencia.IdApp,
    {nullable: false})
    @OneToOne(() => Usuarios, (usuarios) => usuarios.IdApp,
    {nullable: false})
    @OneToOne(() => ConfigConexiones, (configconex) => configconex.IdApp,
    {nullable: false})
    
    
    */
   


}