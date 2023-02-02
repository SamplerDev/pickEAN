import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Apps } from './Apps';
import { Cuentas } from './Cuentas';

@Entity()
export class Dispositivos extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    IdDispositivo!: String;
    
    @ManyToOne(()=>Apps,(apps)=>{apps.Dispositivos},{
        eager: true,
        cascade: true,
        nullable: false})
    IdApp!:Apps[];

    @ManyToOne(()=>Cuentas,(cuentas)=>{cuentas.dispositivos},{
        eager: true,
        cascade: true,
        nullable: false})
    IdCuenta!: Cuentas[];

    @Column()
    ConfirmIdCuenta!:Number;
    
    @Column()
    ConfirmIdApp!:Number

    @Column('bit',{default:false})
    Deleted!:Boolean;




    

    



}