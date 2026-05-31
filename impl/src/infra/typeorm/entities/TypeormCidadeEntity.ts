import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeormEstadoEntity } from "./TypeormEstadoEntity";

@Entity("cidades")
export class TypeormCidadeEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nome: string;

    @ManyToOne(() => TypeormEstadoEntity, { nullable: false })
    public estado: TypeormEstadoEntity;

    @Column()
    public createdAt: Date;

    @Column()
    public updatedAt: Date;

    @Column({ default: true })
    public active: boolean;
}
