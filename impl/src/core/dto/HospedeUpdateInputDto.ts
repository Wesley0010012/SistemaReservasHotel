import { UpdateInputDto } from "./UpdateInputDto";
import { TipoTelefone } from "../enums/TipoTelefone";

export class HospedeUpdateInputDto extends UpdateInputDto {
    public constructor(
        public readonly id: number,
        public readonly nomeCompleto: string,
        public readonly dataNascimento: Date | string,
        public readonly cpf: string,
        public readonly email: string,
        public readonly telefoneDdd: string,
        public readonly telefoneNumero: string,
        public readonly telefoneTipo: TipoTelefone,
        public readonly enderecoLogradouro: string,
        public readonly enderecoNumero: string,
        public readonly enderecoBairro: string,
        public readonly enderecoComplemento: string,
        public readonly enderecoCep: string,
        public readonly cidadeId: number,
    ) {
        super();
    }
}
