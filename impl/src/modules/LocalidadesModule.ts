import { Module } from "@nestjs/common";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CidadesDao } from "src/core/dao/CidadesDao";
import { EstadosDao } from "src/core/dao/EstadosDao";
import { AddInputDto } from "src/core/dto/AddInputDto";
import { CidadeOutputDto } from "src/core/dto/CidadeOutputDto";
import { CidadeSearchParameters } from "src/core/dto/CidadeSearchParameters";
import { EstadoOutputDto } from "src/core/dto/EstadoOutputDto";
import { EstadoSearchParameters } from "src/core/dto/EstadoSearchParameters";
import { UpdateInputDto } from "src/core/dto/UpdateInputDto";
import { Cidade } from "src/core/entities/Cidade";
import { Estado } from "src/core/entities/Estado";
import { AbstractFacade } from "src/core/impl/facades/AbstractFacade";
import { AbstractFacadeRules } from "src/core/impl/facades/AbstractFacadeRules";
import { BuscarPorId } from "src/core/impl/strategies/BuscarPorId";
import { BuscarPorParametros } from "src/core/impl/strategies/BuscarPorParametros";
import { CidadeEntityToOutput } from "src/core/impl/strategies/CidadeEntityToOutput";
import { EstadoEntityToOutput } from "src/core/impl/strategies/EstadoEntityToOutput";
import { IStrategy } from "src/core/protocols/IStrategy";
import { CidadesController } from "src/infra/http/controllers/CidadesController";
import { EstadosController } from "src/infra/http/controllers/EstadosController";
import { TypeormCidadesDao } from "src/infra/typeorm/dao/TypeormCidadesDao";
import { TypeormEstadosDao } from "src/infra/typeorm/dao/TypeormEstadosDao";
import { TypeormCidadeEntity } from "src/infra/typeorm/entities/TypeormCidadeEntity";
import { TypeormEstadoEntity } from "src/infra/typeorm/entities/TypeormEstadoEntity";
import { CIDADES_DAO, CIDADES_FACADE, ESTADOS_DAO, ESTADOS_FACADE } from "./LocalidadesTokens";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TypeormCidadeEntity,
            TypeormEstadoEntity,
        ]),
    ],
    controllers: [
        CidadesController,
        EstadosController,
    ],
    providers: [
        {
            provide: ESTADOS_DAO,
            useFactory: (repository: Repository<TypeormEstadoEntity>): EstadosDao => {
                return new TypeormEstadosDao(repository);
            },
            inject: [getRepositoryToken(TypeormEstadoEntity)],
        },
        {
            provide: CIDADES_DAO,
            useFactory: (repository: Repository<TypeormCidadeEntity>): CidadesDao => {
                return new TypeormCidadesDao(repository);
            },
            inject: [getRepositoryToken(TypeormCidadeEntity)],
        },
        {
            provide: ESTADOS_FACADE,
            useFactory: (estadosDao: EstadosDao): AbstractFacade<AddInputDto, UpdateInputDto, EstadoOutputDto, EstadoSearchParameters> => {
                const buscarEstado = new (class extends BuscarPorId<Estado> { })(estadosDao);
                const buscarEstadosPorParametros = new (class extends BuscarPorParametros<Estado, EstadoSearchParameters> { })(estadosDao);

                return new AbstractFacade<AddInputDto, UpdateInputDto, EstadoOutputDto, EstadoSearchParameters>({
                    [AbstractFacadeRules.ADD]: [],
                    [AbstractFacadeRules.ADD_INPUT_DTO_TO_ENTITY]: [],
                    [AbstractFacadeRules.UPDATE_INPUT_DTO_TO_ENTITY]: [],
                    [AbstractFacadeRules.ENTITY_TO_DTO]: [
                        new EstadoEntityToOutput(),
                    ],
                    [AbstractFacadeRules.UPDATE]: [],
                    [AbstractFacadeRules.DELETE]: [],
                    [AbstractFacadeRules.FIND_BY_ID]: [
                        buscarEstado,
                    ],
                    [AbstractFacadeRules.FIND_BY_PARAMETERS]: [
                        buscarEstadosPorParametros,
                    ],
                } as Record<AbstractFacadeRules, Array<IStrategy>>);
            },
            inject: [ESTADOS_DAO],
        },
        {
            provide: CIDADES_FACADE,
            useFactory: (cidadesDao: CidadesDao): AbstractFacade<AddInputDto, UpdateInputDto, CidadeOutputDto, CidadeSearchParameters> => {
                const buscarCidade = new (class extends BuscarPorId<Cidade> { })(cidadesDao);
                const buscarCidadesPorParametros = new (class extends BuscarPorParametros<Cidade, CidadeSearchParameters> { })(cidadesDao);

                return new AbstractFacade<AddInputDto, UpdateInputDto, CidadeOutputDto, CidadeSearchParameters>({
                    [AbstractFacadeRules.ADD]: [],
                    [AbstractFacadeRules.ADD_INPUT_DTO_TO_ENTITY]: [],
                    [AbstractFacadeRules.UPDATE_INPUT_DTO_TO_ENTITY]: [],
                    [AbstractFacadeRules.ENTITY_TO_DTO]: [
                        new CidadeEntityToOutput(),
                    ],
                    [AbstractFacadeRules.UPDATE]: [],
                    [AbstractFacadeRules.DELETE]: [],
                    [AbstractFacadeRules.FIND_BY_ID]: [
                        buscarCidade,
                    ],
                    [AbstractFacadeRules.FIND_BY_PARAMETERS]: [
                        buscarCidadesPorParametros,
                    ],
                } as Record<AbstractFacadeRules, Array<IStrategy>>);
            },
            inject: [CIDADES_DAO],
        },
    ],
    exports: [
        ESTADOS_FACADE,
        CIDADES_FACADE,
    ],
})
export class LocalidadesModule { }
