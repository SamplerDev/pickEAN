import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Apps } from './Apps';
import { Cuentas } from './Cuentas';

@Entity()
export class Usuarios extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Apps, (apps) => apps.Usuarios, {
        eager: true,
        cascade: true,
        nullable: false
    })
    @JoinColumn()
    IdApp!: Apps;

    @ManyToOne(() => Cuentas, (cuentas) => cuentas.Usuarios, {
        eager: true,
        cascade: true,
        nullable: false
    })
    @JoinColumn()
    IdCuenta!: Cuentas;

    @Column()
    Usuario!: String;
   
    @Column()
    Pwd!: String;

    @Column()
    Admin!: Boolean;

    @Column()
    ConfirmIdCuenta!:Number;
    
    @Column()
    ConfirmIdApp!:Number

    @Column('bit', { default: false })
    Deleted!: Boolean;












}