import { OutputDto } from "./OutputDto";
import { TipoTelefone } from "../enums/TipoTelefone";

export class HospedeOutputDto extends OutputDto {
    public constructor(
        public readonly id: number | null,
        public readonly nomeCompleto: string,
        public readonly dataNascimento: Date,
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
        public readonly cidadeId: number | null,
        public readonly cidadeNome: string,
        public readonly estadoId: number | null,
        public readonly estadoNome: string,
        public readonly estadoUf: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly active: boolean,
    ) {
        super();
    }
}
