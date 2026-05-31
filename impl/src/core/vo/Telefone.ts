import { TipoTelefone } from '../enums/TipoTelefone';

export class Telefone {
    private _ddd: string;
    private _numero: string;
    private _tipo: TipoTelefone;

    public constructor(
        ddd: string,
        numero: string,
        tipo: TipoTelefone
    ) {
        this._ddd = ddd;
        this._numero = numero;
        this._tipo = tipo;
    }

    public get ddd(): string {
        return this._ddd;
    }

    public get numero(): string {
        return this._numero;
    }

    public get tipo(): TipoTelefone {
        return this._tipo;
    }
}
