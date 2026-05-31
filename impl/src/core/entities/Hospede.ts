import { AbstractEntity } from './AbstractEntity';
import { CPF } from '../vo/CPF';
import { Email } from '../vo/Email';
import { Endereco } from '../vo/Endereco';
import { Telefone } from '../vo/Telefone';

export class Hospede extends AbstractEntity {
    private _nomeCompleto: string;
    private _dataNascimento: Date;
    private _cpf: CPF;
    private _email: Email;
    private _telefone: Telefone;
    private _endereco: Endereco;

    public constructor(
        nomeCompleto: string,
        dataNascimento: Date,
        cpf: CPF,
        email: Email,
        telefone: Telefone,
        endereco: Endereco,
        id: number | null = null,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        active: boolean = true,
    ) {
        super(id, createdAt, updatedAt, active);

        this._nomeCompleto = nomeCompleto;
        this._dataNascimento = dataNascimento;
        this._cpf = cpf;
        this._email = email;
        this._telefone = telefone;
        this._endereco = endereco;
    }

    public get nomeCompleto(): string {
        return this._nomeCompleto;
    }

    public get dataNascimento(): Date {
        return this._dataNascimento;
    }

    public get cpf(): CPF {
        return this._cpf;
    }

    public get email(): Email {
        return this._email;
    }

    public get telefone(): Telefone {
        return this._telefone;
    }

    public get endereco(): Endereco {
        return this._endereco;
    }
}