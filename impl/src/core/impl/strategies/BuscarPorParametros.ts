import { IDao } from "src/core/dao/IDao";
import { SearchParameters } from "src/core/dto/SearchParameters";
import { AbstractEntity } from "src/core/entities/AbstractEntity";
import { EntityPage } from "src/core/entities/EntityPage";
import { IStrategy } from "src/core/protocols/IStrategy";

export abstract class BuscarPorParametros<
    E extends AbstractEntity,
    Search extends SearchParameters
> implements IStrategy<Search, EntityPage<E>> {
    public constructor(
        private readonly iDao: IDao<E, Search>
    ) {

    }

    public async execute(input: Search): Promise<EntityPage<E>> {
        return await this.iDao.findByParameters(input);
    }
}
