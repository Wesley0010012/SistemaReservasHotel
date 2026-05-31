import { CidadeOutputDto } from "src/core/dto/CidadeOutputDto";
import { Cidade } from "src/core/entities/Cidade";
import { IStrategy } from "src/core/protocols/IStrategy";

export class CidadeEntityToOutput implements IStrategy<Cidade, CidadeOutputDto> {
    public async execute(input: Cidade): Promise<CidadeOutputDto> {
        return new CidadeOutputDto(
            input.id,
            input.nome,
            input.estado.id,
            input.estado.nome,
            input.estado.uf,
            input.createdAt,
            input.updatedAt,
            input.active,
        );
    }
}
