import { NotFoundError } from "project-custom-errors";
import { IDao } from "src/core/dao/IDao";
import { AbstractEntity } from "src/core/entities/AbstractEntity";
import { IStrategy } from "src/core/protocols/IStrategy";

export abstract class BuscarPorId<E extends AbstractEntity> implements IStrategy<number, E> {
    public constructor(
        private readonly iDao: IDao<E>
    ) {

    }

    public async execute(input: number): Promise<E> {
        const result = await this.iDao.findById(input);

        if (!result) {
            throw new NotFoundError("Entidade não encontrada", `id: ${input}`);
        }

        return result;
    }
}
