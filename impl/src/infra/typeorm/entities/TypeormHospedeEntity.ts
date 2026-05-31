import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoTelefone } from "src/core/enums/TipoTelefone";
import { TypeormCidadeEntity } from "./TypeormCidadeEntity";

@Entity("hospedes")
export class TypeormHospedeEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nomeCompleto: string;

    @Column()
    public dataNascimento: Date;

    @Column()
    public cpfNumero: string;

    @Column()
    public emailEndereco: string;

    @Column()
    public telefoneDdd: string;

    @Column()
    public telefoneNumero: string;

    @Column({
        enum: TipoTelefone,
        type: "enum",
    })
    public telefoneTipo: TipoTelefone;

    @Column()
    public enderecoLogradouro: string;

    @Column()
    public enderecoNumero: string;

    @Column()
    public enderecoBairro: string;

    @Column()
    public enderecoComplemento: string;

    @Column()
    public enderecoCep: string;

    @ManyToOne(() => TypeormCidadeEntity, { nullable: false })
    public cidade: TypeormCidadeEntity;

    @Column()
    public createdAt: Date;

    @Column()
    public updatedAt: Date;

    @Column({ default: true })
    public active: boolean;
}
