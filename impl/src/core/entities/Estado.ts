import { AbstractEntity } from './AbstractEntity';

export class Estado extends AbstractEntity {
    private _nome: string;
    private _uf: string;

    public constructor(
        nome: string,
        uf: string,
        id: number | null = null,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        active: boolean = true,
    ) {
        super(id, createdAt, updatedAt, active);

        this._nome = nome;
        this._uf = uf;
    }

    public get nome(): string {
        return this._nome;
    }

    public get uf(): string {
        return this._uf;
    }
}