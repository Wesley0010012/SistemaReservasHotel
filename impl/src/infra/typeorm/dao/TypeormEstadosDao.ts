import { Repository } from "typeorm";
import { EstadosDao } from "src/core/dao/EstadosDao";
import { EstadoSearchParameters } from "src/core/dto/EstadoSearchParameters";
import { EntityPage } from "src/core/entities/EntityPage";
import { Estado } from "src/core/entities/Estado";
import { TypeormEstadoEntity } from "../entities/TypeormEstadoEntity";
import { TypeormEstadoMapper } from "../mappers/TypeormEstadoMapper";

export class TypeormEstadosDao implements EstadosDao {
    public constructor(
        private readonly repository: Repository<TypeormEstadoEntity>,
    ) { }

    public async add(entity: Estado): Promise<void> {
        await this.repository.save(TypeormEstadoMapper.toTypeorm(entity));
    }

    public async update(entity: Estado): Promise<void> {
        await this.repository.save(TypeormEstadoMapper.toTypeorm(entity));
    }

    public async findAllPaginated(): Promise<Estado[]> {
        const entities = await this.repository.find();

        return entities.map(TypeormEstadoMapper.toDomain);
    }

    public async findById(id: number): Promise<Estado | null> {
        const entity = await this.repository.findOne({
            where: { id },
        });

        if (entity === null) {
            return null;
        }

        return TypeormEstadoMapper.toDomain(entity);
    }

    public async findByParameters(searchParameters: EstadoSearchParameters): Promise<EntityPage<Estado>> {
        const pagination = this.getPagination(searchParameters);
        const query = this.repository
            .createQueryBuilder("estado")
            .orderBy("estado.id", pagination.ordenacao)
            .skip((pagination.paginaAtual - 1) * pagination.quantidade)
            .take(pagination.quantidade);

        if (searchParameters.nome?.trim()) {
            query.andWhere("LOWER(estado.nome) LIKE LOWER(:nome)", {
                nome: `%${searchParameters.nome.trim()}%`,
            });
        }

        if (searchParameters.uf?.trim()) {
            query.andWhere("LOWER(estado.uf) = LOWER(:uf)", {
                uf: searchParameters.uf.trim(),
            });
        }

        const [entities, total] = await query.getManyAndCount();

        return new EntityPage<Estado>(
            entities.map(TypeormEstadoMapper.toDomain),
            pagination.paginaAtual,
            pagination.quantidade,
            pagination.ordenacao,
            total,
        );
    }

    private getPagination(searchParameters: EstadoSearchParameters): {
        paginaAtual: number,
        quantidade: number,
        ordenacao: "ASC" | "DESC",
    } {
        const paginaAtual = Number(searchParameters.paginaAtual);
        const quantidade = Number(searchParameters.quantidade);
        const ordenacao = searchParameters.ordenacao === "ASC" ? "ASC" : "DESC";

        return {
            paginaAtual: Number.isInteger(paginaAtual) && paginaAtual > 0 ? paginaAtual : 1,
            quantidade: [10, 20, 50, 100].includes(quantidade) ? quantidade : 10,
            ordenacao,
        };
    }
}
