import { Controller, Get, Inject, Param, ParseIntPipe, Query } from "@nestjs/common";
import { AddInputDto } from "src/core/dto/AddInputDto";
import { EntityPageDto } from "src/core/dto/EntityPageDto";
import { EstadoOutputDto } from "src/core/dto/EstadoOutputDto";
import { EstadoSearchParameters } from "src/core/dto/EstadoSearchParameters";
import { UpdateInputDto } from "src/core/dto/UpdateInputDto";
import { AbstractFacade } from "src/core/impl/facades/AbstractFacade";
import { ESTADOS_FACADE } from "src/modules/LocalidadesTokens";

@Controller("api/estados")
export class EstadosController {
    public constructor(
        @Inject(ESTADOS_FACADE)
        private readonly facade: AbstractFacade<AddInputDto, UpdateInputDto, EstadoOutputDto, EstadoSearchParameters>,
    ) { }

    @Get()
    public async findByParameters(@Query() searchParameters: EstadoSearchParameters): Promise<EntityPageDto<EstadoOutputDto>> {
        return await this.facade.findByParameters(searchParameters);
    }

    @Get(":id")
    public async findById(@Param("id", ParseIntPipe) id: number): Promise<EstadoOutputDto> {
        return await this.facade.findById(id);
    }
}
