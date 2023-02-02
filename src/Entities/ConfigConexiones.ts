
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Apps } from './Apps';
import { Cuentas } from './Cuentas';

@Entity()
export class ConfigConexiones extends BaseEntity {


    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    Tipo!: String;

    @Column()
    User!: String;

    @Column()
    Pwd!: String;

    @Column()
    Odata!: String;

    @Column('bit', { default: false })
    Deleted!: Boolean;

    @ManyToOne(() => Apps,(apps) =>apps.configconexiones,{
        eager: true,
        cascade: true,
        nullable: false
    } )
    @JoinColumn()
    IdApp!: Apps; 


    @ManyToOne(() => Cuentas, (cuentas) => cuentas.ConfigConexiones, {
        eager: true,
        cascade: true,
        nullable: false
    })
    @JoinColumn()
    IdCuenta!: Cuentas; 


    @Column()
    ConfirmIdCuenta!:Number;
    
    @Column()
    ConfirmIdApp!:Number




}