import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Apps } from './Apps';
import { Cuentas } from './Cuentas';
var GraphQLDate = require('graphql-date')

@Entity()
export class VigenciaLicencia extends BaseEntity{

    @PrimaryGeneratedColumn()
     id!:number;

     
    @ManyToOne(() => Apps, (apps) => apps.id, {
        eager: true,
        cascade: true,
        nullable: false,
    })
    @JoinColumn()
    IdApp!: Apps;
    
    @ManyToOne(() => Cuentas, (cuenta) => cuenta.vigenciaLicencia, {
        eager: true,
        cascade: true,
        nullable: false,
    } )
    IdCuenta!:Cuentas;

    @Column()
    Vencimiento!:Date;

    @Column()
    CantDisp!: Number;

    @Column('int',{default: 0})
    CantDispAct!: number;

    @Column()
    ConfirmIdCuenta!:Number;
    
    @Column()
    ConfirmIdApp!:Number

    @Column('bit',{default:false})
    Deleted!:Boolean;

}