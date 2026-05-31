import { Hospede } from "src/core/entities/Hospede";
import { CPF } from "src/core/vo/CPF";
import { Email } from "src/core/vo/Email";
import { Endereco } from "src/core/vo/Endereco";
import { Telefone } from "src/core/vo/Telefone";
import { TypeormHospedeEntity } from "../entities/TypeormHospedeEntity";
import { TypeormCidadeMapper } from "./TypeormCidadeMapper";

export class TypeormHospedeMapper {
    public static toDomain(entity: TypeormHospedeEntity): Hospede {
        return new Hospede(
            entity.nomeCompleto,
            entity.dataNascimento,
            new CPF(entity.cpfNumero),
            new Email(entity.emailEndereco),
            new Telefone(
                entity.telefoneDdd,
                entity.telefoneNumero,
                entity.telefoneTipo,
            ),
            new Endereco(
                entity.enderecoLogradouro,
                entity.enderecoNumero,
                entity.enderecoBairro,
                entity.enderecoComplemento,
                entity.enderecoCep,
                TypeormCidadeMapper.toDomain(entity.cidade),
            ),
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active,
        );
    }

    public static toTypeorm(hospede: Hospede): TypeormHospedeEntity {
        const entity = new TypeormHospedeEntity();

        if (hospede.id !== null) {
            entity.id = hospede.id;
        }

        entity.nomeCompleto = hospede.nomeCompleto;
        entity.dataNascimento = hospede.dataNascimento;
        entity.cpfNumero = hospede.cpf.numero;
        entity.emailEndereco = hospede.email.endereco;
        entity.telefoneDdd = hospede.telefone.ddd;
        entity.telefoneNumero = hospede.telefone.numero;
        entity.telefoneTipo = hospede.telefone.tipo;
        entity.enderecoLogradouro = hospede.endereco.logradouro;
        entity.enderecoNumero = hospede.endereco.numero;
        entity.enderecoBairro = hospede.endereco.bairro;
        entity.enderecoComplemento = hospede.endereco.complemento;
        entity.enderecoCep = hospede.endereco.cep;
        entity.cidade = TypeormCidadeMapper.toTypeorm(hospede.endereco.cidade);
        entity.createdAt = hospede.createdAt;
        entity.updatedAt = hospede.updatedAt;
        entity.active = hospede.active;

        return entity;
    }
}
