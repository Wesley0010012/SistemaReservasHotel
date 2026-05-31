import { Repository } from "typeorm";
import { CidadesDao } from "src/core/dao/CidadesDao";
import { CidadeSearchParameters } from "src/core/dto/CidadeSearchParameters";
import { Cidade } from "src/core/entities/Cidade";
import { EntityPage } from "src/core/entities/EntityPage";
import { TypeormCidadeEntity } from "../entities/TypeormCidadeEntity";
import { TypeormCidadeMapper } from "../mappers/TypeormCidadeMapper";

export class TypeormCidadesDao implements CidadesDao {
    public constructor(
        private readonly repository: Repository<TypeormCidadeEntity>,
    ) { }

    public async add(entity: Cidade): Promise<void> {
        await this.repository.save(TypeormCidadeMapper.toTypeorm(entity));
    }

    public async update(entity: Cidade): Promise<void> {
        await this.repository.save(TypeormCidadeMapper.toTypeorm(entity));
    }

    public async findAllPaginated(): Promise<Cidade[]> {
        const entities = await this.repository.find({
            relations: {
                estado: true,
            },
        });

        return entities.map(TypeormCidadeMapper.toDomain);
    }

    public async findById(id: number): Promise<Cidade | null> {
        const entity = await this.repository.findOne({
            where: { id },
            relations: {
                estado: true,
            },
        });

        if (entity === null) {
            return null;
        }

        return TypeormCidadeMapper.toDomain(entity);
    }

    public async findByParameters(searchParameters: CidadeSearchParameters): Promise<EntityPage<Cidade>> {
        const pagination = this.getPagination(searchParameters);
        const query = this.repository
            .createQueryBuilder("cidade")
            .leftJoinAndSelect("cidade.estado", "estado")
            .orderBy("cidade.id", pagination.ordenacao)
            .skip((pagination.paginaAtual - 1) * pagination.quantidade)
            .take(pagination.quantidade);

        if (searchParameters.nome?.trim()) {
            query.andWhere("LOWER(cidade.nome) LIKE LOWER(:nome)", {
                nome: `%${searchParameters.nome.trim()}%`,
            });
        }

        const estadoId = Number(searchParameters.estadoId);
        if (Number.isInteger(estadoId) && estadoId > 0) {
            query.andWhere("estado.id = :estadoId", { estadoId });
        }

        const [entities, total] = await query.getManyAndCount();

        return new EntityPage<Cidade>(
            entities.map(TypeormCidadeMapper.toDomain),
            pagination.paginaAtual,
            pagination.quantidade,
            pagination.ordenacao,
            total,
        );
    }

    private getPagination(searchParameters: CidadeSearchParameters): {
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
