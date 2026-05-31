import { Cidade } from "src/core/entities/Cidade";
import { TypeormCidadeEntity } from "../entities/TypeormCidadeEntity";
import { TypeormEstadoMapper } from "./TypeormEstadoMapper";

export class TypeormCidadeMapper {
    public static toDomain(entity: TypeormCidadeEntity): Cidade {
        return new Cidade(
            entity.nome,
            TypeormEstadoMapper.toDomain(entity.estado),
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active,
        );
    }

    public static toTypeorm(cidade: Cidade): TypeormCidadeEntity {
        const entity = new TypeormCidadeEntity();

        if (cidade.id !== null) {
            entity.id = cidade.id;
        }

        entity.nome = cidade.nome;
        entity.estado = TypeormEstadoMapper.toTypeorm(cidade.estado);
        entity.createdAt = cidade.createdAt;
        entity.updatedAt = cidade.updatedAt;
        entity.active = cidade.active;

        return entity;
    }
}
