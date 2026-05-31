import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("estados")
export class TypeormEstadoEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nome: string;

    @Column({ length: 2 })
    public uf: string;

    @Column()
    public createdAt: Date;

    @Column()
    public updatedAt: Date;

    @Column({ default: true })
    public active: boolean;
}
