import { Controller, Get, Inject, Param, ParseIntPipe, Query } from "@nestjs/common";
import { AddInputDto } from "src/core/dto/AddInputDto";
import { CidadeOutputDto } from "src/core/dto/CidadeOutputDto";
import { CidadeSearchParameters } from "src/core/dto/CidadeSearchParameters";
import { EntityPageDto } from "src/core/dto/EntityPageDto";
import { UpdateInputDto } from "src/core/dto/UpdateInputDto";
import { AbstractFacade } from "src/core/impl/facades/AbstractFacade";
import { CIDADES_FACADE } from "src/modules/LocalidadesTokens";

@Controller("api/cidades")
export class CidadesController {
    public constructor(
        @Inject(CIDADES_FACADE)
        private readonly facade: AbstractFacade<AddInputDto, UpdateInputDto, CidadeOutputDto, CidadeSearchParameters>,
    ) { }

    @Get()
    public async findByParameters(@Query() searchParameters: CidadeSearchParameters): Promise<EntityPageDto<CidadeOutputDto>> {
        return await this.facade.findByParameters(searchParameters);
    }

    @Get(":id")
    public async findById(@Param("id", ParseIntPipe) id: number): Promise<CidadeOutputDto> {
        return await this.facade.findById(id);
    }
}
