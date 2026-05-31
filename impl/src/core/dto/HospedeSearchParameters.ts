import { SearchParameters } from "./SearchParameters";

export class HospedeSearchParameters extends SearchParameters {
    public readonly nomeCompleto?: string;
    public readonly dataNascimento?: Date | string;
    public readonly cpf?: string;
    public readonly email?: string;
    public readonly telefoneDdd?: string;
    public readonly telefoneNumero?: string;
    public readonly telefoneTipo?: string;
    public readonly enderecoLogradouro?: string;
    public readonly enderecoNumero?: string;
    public readonly enderecoBairro?: string;
    public readonly enderecoComplemento?: string;
    public readonly enderecoCep?: string;
    public readonly cidadeId?: number | string;
    public readonly estadoId?: number | string;
}
