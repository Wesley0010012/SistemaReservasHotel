import { IDao } from "../../dao/IDao";
import { AbstractEntity } from "../../entities/AbstractEntity";
import { IStrategy } from "../../protocols/IStrategy";

export class ExcluirEntidade<E extends AbstractEntity> implements IStrategy<E, void> {
    public constructor(
        private readonly iDao: IDao<E>
    ) {

    }

    public async execute(input: E): Promise<void> {
        input.deactivate();

        await this.iDao.update(input);
    }
}
