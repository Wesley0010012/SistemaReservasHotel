import { Module } from "@nestjs/common";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CidadesDao } from "src/core/dao/CidadesDao";
import { HospedesDao } from "src/core/dao/HospedesDao";
import { HospedeAddInputDto } from "src/core/dto/HospedeAddInputDto";
import { HospedeOutputDto } from "src/core/dto/HospedeOutputDto";
import { HospedeSearchParameters } from "src/core/dto/HospedeSearchParameters";
import { HospedeUpdateInputDto } from "src/core/dto/HospedeUpdateInputDto";
import { Cidade } from "src/core/entities/Cidade";
import { Hospede } from "src/core/entities/Hospede";
import { AbstractFacade } from "src/core/impl/facades/AbstractFacade";
import { AbstractFacadeRules } from "src/core/impl/facades/AbstractFacadeRules";
import { AdicionarEntidade } from "src/core/impl/strategies/AdicionarEntidade";
import { AtualizarEntidade } from "src/core/impl/strategies/AtualizarEntidade";
import { BuscarPorId } from "src/core/impl/strategies/BuscarPorId";
import { BuscarPorParametros } from "src/core/impl/strategies/BuscarPorParametros";
import { ExcluirEntidade } from "src/core/impl/strategies/ExcluirEntidade";
import { HospedeAddInputToEntity } from "src/core/impl/strategies/HospedeAddInputToEntity";
import { HospedeEntityToOutput } from "src/core/impl/strategies/HospedeEntityToOutput";
import { HospedeUpdateInputToEntity } from "src/core/impl/strategies/HospedeUpdateInputToEntity";
import { ValidarDadosObrigatorios } from "src/core/impl/strategies/ValidarDadosObrigatorios";
import { ValidarEmail } from "src/core/impl/strategies/ValidarEmail";
import { VerificarCPFUnico } from "src/core/impl/strategies/VerificarCPFUnico";
import { VerificarEmailUnico } from "src/core/impl/strategies/VerificarEmailUnico";
import { IStrategy } from "src/core/protocols/IStrategy";
import { HospedesController } from "src/infra/http/controllers/HospedesController";
import { TypeormCidadesDao } from "src/infra/typeorm/dao/TypeormCidadesDao";
import { TypeormHospedesDao } from "src/infra/typeorm/dao/TypeormHospedesDao";
import { TypeormCidadeEntity } from "src/infra/typeorm/entities/TypeormCidadeEntity";
import { TypeormEstadoEntity } from "src/infra/typeorm/entities/TypeormEstadoEntity";
import { TypeormHospedeEntity } from "src/infra/typeorm/entities/TypeormHospedeEntity";
import { CIDADES_DAO, HOSPEDES_DAO, HOSPEDES_FACADE } from "./HospedesTokens";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TypeormHospedeEntity,
            TypeormCidadeEntity,
            TypeormEstadoEntity,
        ]),
    ],
    controllers: [HospedesController],
    providers: [
        {
            provide: HOSPEDES_DAO,
            useFactory: (repository: Repository<TypeormHospedeEntity>): HospedesDao => {
                return new TypeormHospedesDao(repository);
            },
            inject: [getRepositoryToken(TypeormHospedeEntity)],
        },
        {
            provide: CIDADES_DAO,
            useFactory: (repository: Repository<TypeormCidadeEntity>): CidadesDao => {
                return new TypeormCidadesDao(repository);
            },
            inject: [getRepositoryToken(TypeormCidadeEntity)],
        },
        {
            provide: HOSPEDES_FACADE,
            useFactory: (
                hospedesDao: HospedesDao,
                cidadesDao: CidadesDao,
            ): AbstractFacade<HospedeAddInputDto, HospedeUpdateInputDto, HospedeOutputDto, HospedeSearchParameters> => {
                const buscarCidade = new (class extends BuscarPorId<Cidade> { })(cidadesDao);
                const buscarHospede = new (class extends BuscarPorId<Hospede> { })(hospedesDao);
                const buscarHospedesPorParametros = new (class extends BuscarPorParametros<Hospede, HospedeSearchParameters> { })(hospedesDao);

                return new AbstractFacade<HospedeAddInputDto, HospedeUpdateInputDto, HospedeOutputDto, HospedeSearchParameters>({
                    [AbstractFacadeRules.ADD]: [
                        new ValidarDadosObrigatorios(),
                        new ValidarEmail(),
                        new VerificarCPFUnico(hospedesDao),
                        new VerificarEmailUnico(hospedesDao),
                        new AdicionarEntidade(hospedesDao),
                    ],
                    [AbstractFacadeRules.ADD_INPUT_DTO_TO_ENTITY]: [
                        new HospedeAddInputToEntity(buscarCidade),
                    ],
                    [AbstractFacadeRules.UPDATE_INPUT_DTO_TO_ENTITY]: [
                        new HospedeUpdateInputToEntity(buscarCidade),
                    ],
                    [AbstractFacadeRules.ENTITY_TO_DTO]: [
                        new HospedeEntityToOutput(),
                    ],
                    [AbstractFacadeRules.UPDATE]: [
                        new ValidarDadosObrigatorios(),
                        new ValidarEmail(),
                        new AtualizarEntidade(hospedesDao),
                    ],
                    [AbstractFacadeRules.DELETE]: [
                        new ExcluirEntidade(hospedesDao),
                    ],
                    [AbstractFacadeRules.FIND_BY_ID]: [
                        buscarHospede,
                    ],
                    [AbstractFacadeRules.FIND_BY_PARAMETERS]: [
                        buscarHospedesPorParametros,
                    ],
                } as Record<AbstractFacadeRules, Array<IStrategy>>);
            },
            inject: [HOSPEDES_DAO, CIDADES_DAO],
        },
    ],
    exports: [HOSPEDES_FACADE],
})
export class HospedesModule { }
