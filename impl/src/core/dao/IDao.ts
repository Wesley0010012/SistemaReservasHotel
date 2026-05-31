import { AbstractEntity } from "../entities/AbstractEntity";
import { SearchParameters } from "../dto/SearchParameters";
import { EntityPage } from "../entities/EntityPage";

export interface IDao<E extends AbstractEntity, Search extends SearchParameters = SearchParameters> {
    add(entity: E): Promise<void>
    update(entity: E): Promise<void>
    findAllPaginated(): Promise<E[]>
    findById(id: number): Promise<E | null>
    findByParameters(searchParameters: Search): Promise<EntityPage<E>>
}
