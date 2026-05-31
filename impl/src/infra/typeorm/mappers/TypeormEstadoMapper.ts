import { Estado } from "src/core/entities/Estado";
import { TypeormEstadoEntity } from "../entities/TypeormEstadoEntity";

export class TypeormEstadoMapper {
    public static toDomain(entity: TypeormEstadoEntity): Estado {
        return new Estado(
            entity.nome,
            entity.uf,
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active,
        );
    }

    public static toTypeorm(estado: Estado): TypeormEstadoEntity {
        const entity = new TypeormEstadoEntity();

        if (estado.id !== null) {
            entity.id = estado.id;
        }

        entity.nome = estado.nome;
        entity.uf = estado.uf;
        entity.createdAt = estado.createdAt;
        entity.updatedAt = estado.updatedAt;
        entity.active = estado.active;

        return entity;
    }
}
