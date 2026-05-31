import { AddInputDto } from "../dto/AddInputDto"
import { EntityPageDto } from "../dto/EntityPageDto"
import { OutputDto } from "../dto/OutputDto"
import { SearchParameters } from "../dto/SearchParameters"
import { UpdateInputDto } from "../dto/UpdateInputDto"

export interface IFacade<
    AddInput extends AddInputDto,
    UpdateInput extends UpdateInputDto,
    Output extends OutputDto,
    Search extends SearchParameters
> {
    findById(id: number): Promise<Output>

    findByParameters(searchParameters: Search): Promise<EntityPageDto<Output>>

    add(addInputDto: AddInput): Promise<Output>

    update(updateInputDto: UpdateInput): Promise<Output>

    deleteById(id: number): Promise<Output>
}
