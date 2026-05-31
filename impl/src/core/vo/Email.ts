export class Email {
    private _endereco: string;

    public constructor(endereco: string) {
        this._endereco = endereco;
    }

    public get endereco(): string {
        return this._endereco;
    }
}
