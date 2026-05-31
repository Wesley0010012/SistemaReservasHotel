import { AddInputDto } from "src/core/dto/AddInputDto";
import { EntityPageDto } from "src/core/dto/EntityPageDto";
import { OutputDto } from "src/core/dto/OutputDto";
import { SearchParameters } from "src/core/dto/SearchParameters";
import { UpdateInputDto } from "src/core/dto/UpdateInputDto";
import { IFacade } from "src/core/protocols/IFacade";
import { AbstractFacadeRules } from "./AbstractFacadeRules";
import { IStrategy } from "src/core/protocols/IStrategy";

export class AbstractFacade<AddInput extends AddInputDto,
    UpdateInput extends UpdateInputDto,
    Output extends OutputDto,
    Search extends SearchParameters> implements IFacade<AddInput, UpdateInput, Output, Search> {

    public constructor(
        private readonly rules: Record<AbstractFacadeRules, Array<IStrategy>>
    ) {

    }

    public async add(addInputDto: AddInput): Promise<Output> {
        const entity = await this.rules[AbstractFacadeRules.ADD_INPUT_DTO_TO_ENTITY][0].execute(addInputDto);

        for (const rule of this.rules[AbstractFacadeRules.ADD]) {
            await rule.execute(entity);
        }

        return await this.rules[AbstractFacadeRules.ENTITY_TO_DTO][0].execute(entity);
    }

    public async findById(id: number): Promise<Output> {
        const entity = await this.rules[AbstractFacadeRules.FIND_BY_ID][0].execute(id);

        return await this.rules[AbstractFacadeRules.ENTITY_TO_DTO][0].execute(entity);
    }

    public async findByParameters(searchParameters: Search): Promise<EntityPageDto<Output>> {
        const entityPage = await this.rules[AbstractFacadeRules.FIND_BY_PARAMETERS][0].execute(searchParameters);
        const output: Output[] = [];

        for (const entity of entityPage.entities) {
            output.push(await this.rules[AbstractFacadeRules.ENTITY_TO_DTO][0].execute(entity));
        }

        return new EntityPageDto<Output>(
            output,
            entityPage.paginaAtual,
            entityPage.quantidade,
            entityPage.ordenacao,
            entityPage.total,
        );
    }

    public async update(updateInputDto: UpdateInput): Promise<Output> {
        const entity = await this.rules[AbstractFacadeRules.UPDATE_INPUT_DTO_TO_ENTITY][0].execute(updateInputDto);

        for (const rule of this.rules[AbstractFacadeRules.UPDATE]) {
            await rule.execute(entity);
        }

        return await this.rules[AbstractFacadeRules.ENTITY_TO_DTO][0].execute(entity);
    }

    public async deleteById(id: number): Promise<Output> {
        const entity = await this.rules[AbstractFacadeRules.FIND_BY_ID][0].execute(id);

        for (const rule of this.rules[AbstractFacadeRules.DELETE]) {
            await rule.execute(entity);
        }

        return await this.rules[AbstractFacadeRules.ENTITY_TO_DTO][0].execute(entity);
    }
}
