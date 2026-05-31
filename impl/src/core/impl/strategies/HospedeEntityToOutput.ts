import { HospedeOutputDto } from "src/core/dto/HospedeOutputDto";
import { Hospede } from "src/core/entities/Hospede";
import { IStrategy } from "src/core/protocols/IStrategy";

export class HospedeEntityToOutput implements IStrategy<Hospede, HospedeOutputDto> {
    public async execute(input: Hospede): Promise<HospedeOutputDto> {
        return new HospedeOutputDto(
            input.id,
            input.nomeCompleto,
            input.dataNascimento,
            input.cpf.numero,
            input.email.endereco,
            input.telefone.ddd,
            input.telefone.numero,
            input.telefone.tipo,
            input.endereco.logradouro,
            input.endereco.numero,
            input.endereco.bairro,
            input.endereco.complemento,
            input.endereco.cep,
            input.endereco.cidade.id,
            input.endereco.cidade.nome,
            input.endereco.cidade.estado.id,
            input.endereco.cidade.estado.nome,
            input.endereco.cidade.estado.uf,
            input.createdAt,
            input.updatedAt,
            input.active,
        );
    }
}
