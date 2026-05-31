import { EstadoOutputDto } from "src/core/dto/EstadoOutputDto";
import { Estado } from "src/core/entities/Estado";
import { IStrategy } from "src/core/protocols/IStrategy";

export class EstadoEntityToOutput implements IStrategy<Estado, EstadoOutputDto> {
    public async execute(input: Estado): Promise<EstadoOutputDto> {
        return new EstadoOutputDto(
            input.id,
            input.nome,
            input.uf,
            input.createdAt,
            input.updatedAt,
            input.active,
        );
    }
}
