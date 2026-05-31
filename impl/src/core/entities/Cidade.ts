import { AbstractEntity } from './AbstractEntity';
import { Estado } from './Estado';

export class Cidade extends AbstractEntity {
    private _nome: string;
    private _estado: Estado;

    public constructor(
        nome: string,
        estado: Estado,
        id: number | null = null,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        active: boolean = true,
    ) {
        super(id, createdAt, updatedAt, active);

        this._nome = nome;
        this._estado = estado;
    }

    public get nome(): string {
        return this._nome;
    }

    public get estado(): Estado {
        return this._estado;
    }
}