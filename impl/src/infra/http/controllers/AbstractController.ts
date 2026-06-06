import { Body, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { AddInputDto } from "src/core/dto/AddInputDto";
import { EntityPageDto } from "src/core/dto/EntityPageDto";
import { OutputDto } from "src/core/dto/OutputDto";
import { SearchParameters } from "src/core/dto/SearchParameters";
import { UpdateInputDto } from "src/core/dto/UpdateInputDto";
import { AbstractFacade } from "src/core/impl/facades/AbstractFacade";

export abstract class AbstractController<
    AddInput extends AddInputDto,
    UpdateInput extends UpdateInputDto,
    Output extends OutputDto,
    Search extends SearchParameters
> {
    protected constructor(
        protected readonly facade: AbstractFacade<AddInput, UpdateInput, Output, Search>,
    ) { }

    @Post()
    public async add(@Body() addInputDto: AddInput): Promise<Output> {
        return await this.facade.add(addInputDto);
    }

    @Get()
    public async findByParameters(@Query() searchParameters: Search): Promise<EntityPageDto<Output>> {
        return await this.facade.findByParameters(searchParameters);
    }

    @Get(":id")
    public async findById(@Param("id", ParseIntPipe) id: number): Promise<Output> {
        return await this.facade.findById(id);
    }

    @Put()
    public async update(@Body() updateInputDto: UpdateInput): Promise<Output> {
        return await this.facade.update(updateInputDto);
    }

    @Delete(":id")
    public async deleteById(@Param("id", ParseIntPipe) id: number): Promise<Output> {
        return await this.facade.deleteById(id);
    }
}
