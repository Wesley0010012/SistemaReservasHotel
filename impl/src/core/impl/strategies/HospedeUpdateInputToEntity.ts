import { HospedeUpdateInputDto } from "src/core/dto/HospedeUpdateInputDto";
import { Cidade } from "src/core/entities/Cidade";
import { Hospede } from "src/core/entities/Hospede";
import { IStrategy } from "src/core/protocols/IStrategy";
import { CPF } from "src/core/vo/CPF";
import { Email } from "src/core/vo/Email";
import { Endereco } from "src/core/vo/Endereco";
import { Telefone } from "src/core/vo/Telefone";

export class HospedeUpdateInputToEntity implements IStrategy<HospedeUpdateInputDto, Hospede> {
    public constructor(
        private readonly buscarCidade: IStrategy<number, Cidade>,
    ) { }

    public async execute(input: HospedeUpdateInputDto): Promise<Hospede> {
        const cidade = await this.buscarCidade.execute(input.cidadeId);
        const dataNascimento = new Date(input.dataNascimento);

        return new Hospede(
            input.nomeCompleto,
            dataNascimento,
            new CPF(input.cpf),
            new Email(input.email),
            new Telefone(
                input.telefoneDdd,
                input.telefoneNumero,
                input.telefoneTipo,
            ),
            new Endereco(
                input.enderecoLogradouro,
                input.enderecoNumero,
                input.enderecoBairro,
                input.enderecoComplemento,
                input.enderecoCep,
                cidade,
            ),
            input.id,
        );
    }
}
