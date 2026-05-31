import { Repository } from "typeorm";
import { HospedesDao } from "src/core/dao/HospedesDao";
import { HospedeSearchParameters } from "src/core/dto/HospedeSearchParameters";
import { EntityPage } from "src/core/entities/EntityPage";
import { Hospede } from "src/core/entities/Hospede";
import { CPF } from "src/core/vo/CPF";
import { Email } from "src/core/vo/Email";
import { TypeormHospedeEntity } from "../entities/TypeormHospedeEntity";
import { TypeormHospedeMapper } from "../mappers/TypeormHospedeMapper";

export class TypeormHospedesDao implements HospedesDao {
    public constructor(
        private readonly repository: Repository<TypeormHospedeEntity>,
    ) { }

    public async add(entity: Hospede): Promise<void> {
        await this.repository.save(TypeormHospedeMapper.toTypeorm(entity));
    }

    public async update(entity: Hospede): Promise<void> {
        await this.repository.save(TypeormHospedeMapper.toTypeorm(entity));
    }

    public async findAllPaginated(): Promise<Hospede[]> {
        const entities = await this.repository.find({
            relations: {
                cidade: {
                    estado: true,
                },
            },
        });

        return entities.map(TypeormHospedeMapper.toDomain);
    }

    public async findById(id: number): Promise<Hospede | null> {
        const entity = await this.repository.findOne({
            where: { id },
            relations: {
                cidade: {
                    estado: true,
                },
            },
        });

        if (entity === null) {
            return null;
        }

        return TypeormHospedeMapper.toDomain(entity);
    }

    public async findByParameters(searchParameters: HospedeSearchParameters): Promise<EntityPage<Hospede>> {
        const pagination = this.getPagination(searchParameters);
        const query = this.repository
            .createQueryBuilder("hospede")
            .leftJoinAndSelect("hospede.cidade", "cidade")
            .leftJoinAndSelect("cidade.estado", "estado")
            .orderBy("hospede.id", pagination.ordenacao)
            .skip((pagination.paginaAtual - 1) * pagination.quantidade)
            .take(pagination.quantidade);

        const addStringFilter = (property: string, parameter: string, value?: string): void => {
            const normalized = value?.trim();
            if (normalized) {
                query.andWhere(`LOWER(${property}) LIKE LOWER(:${parameter})`, {
                    [parameter]: `%${normalized}%`,
                });
            }
        };

        const addExactStringFilter = (property: string, parameter: string, value?: string): void => {
            const normalized = value?.trim();
            if (normalized) {
                query.andWhere(`${property} = :${parameter}`, {
                    [parameter]: normalized,
                });
            }
        };

        const addNumberFilter = (property: string, parameter: string, value?: number | string): void => {
            const normalized = Number(value);
            if (Number.isInteger(normalized) && normalized > 0) {
                query.andWhere(`${property} = :${parameter}`, {
                    [parameter]: normalized,
                });
            }
        };

        addStringFilter("hospede.nomeCompleto", "nomeCompleto", searchParameters.nomeCompleto);
        addExactStringFilter("hospede.cpfNumero", "cpf", searchParameters.cpf);
        addStringFilter("hospede.emailEndereco", "email", searchParameters.email);
        addExactStringFilter("hospede.telefoneDdd", "telefoneDdd", searchParameters.telefoneDdd);
        addStringFilter("hospede.telefoneNumero", "telefoneNumero", searchParameters.telefoneNumero);
        addExactStringFilter("hospede.telefoneTipo", "telefoneTipo", searchParameters.telefoneTipo);
        addStringFilter("hospede.enderecoLogradouro", "enderecoLogradouro", searchParameters.enderecoLogradouro);
        addExactStringFilter("hospede.enderecoNumero", "enderecoNumero", searchParameters.enderecoNumero);
        addStringFilter("hospede.enderecoBairro", "enderecoBairro", searchParameters.enderecoBairro);
        addStringFilter("hospede.enderecoComplemento", "enderecoComplemento", searchParameters.enderecoComplemento);
        addExactStringFilter("hospede.enderecoCep", "enderecoCep", searchParameters.enderecoCep);
        addNumberFilter("cidade.id", "cidadeId", searchParameters.cidadeId);
        addNumberFilter("estado.id", "estadoId", searchParameters.estadoId);

        if (searchParameters.dataNascimento) {
            query.andWhere("DATE(hospede.dataNascimento) = DATE(:dataNascimento)", {
                dataNascimento: searchParameters.dataNascimento,
            });
        }

        const [entities, total] = await query.getManyAndCount();

        return new EntityPage<Hospede>(
            entities.map(TypeormHospedeMapper.toDomain),
            pagination.paginaAtual,
            pagination.quantidade,
            pagination.ordenacao,
            total,
        );
    }

    private getPagination(searchParameters: HospedeSearchParameters): {
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

    public async existsByCPF(cpf: CPF): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                cpfNumero: cpf.numero,
            },
        });

        return count > 0;
    }

    public async existsByEmail(email: Email): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                emailEndereco: email.endereco,
            },
        });

        return count > 0;
    }
}
