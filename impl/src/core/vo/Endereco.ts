import { Cidade } from '../entities/Cidade';

export class Endereco {
    private _logradouro: string;
    private _numero: string;
    private _bairro: string;
    private _complemento: string;
    private _cep: string;
    private _cidade: Cidade;

    constructor(
        logradouro: string,
        numero: string,
        bairro: string,
        complemento: string,
        cep: string,
        cidade: Cidade,
    ) {
        this._logradouro = logradouro;
        this._numero = numero;
        this._bairro = bairro;
        this._complemento = complemento;
        this._cep = cep;
        this._cidade = cidade;
    }

    public get logradouro(): string {
        return this._logradouro;
    }

    public get numero(): string {
        return this._numero;
    }

    public get bairro(): string {
        return this._bairro;
    }

    public get complemento(): string {
        return this._complemento;
    }

    public get cep(): string {
        return this._cep;
    }

    public get cidade(): Cidade {
        return this._cidade;
    }
}
