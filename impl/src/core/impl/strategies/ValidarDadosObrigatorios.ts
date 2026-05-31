import { ValidationError } from "project-custom-errors";
import { Hospede } from "src/core/entities/Hospede";
import { IStrategy } from "src/core/protocols/IStrategy";

export class ValidarDadosObrigatorios implements IStrategy<Hospede, void> {
    public async execute(input: Hospede): Promise<void> {
        this.validarTexto(input.nomeCompleto, "Nome completo");
        this.validarData(input.dataNascimento, "Data de nascimento");
        this.validarTexto(input.cpf.numero, "CPF");
        this.validarTexto(input.email.endereco, "E-mail");
        this.validarTexto(input.telefone.ddd, "DDD do telefone");
        this.validarTexto(input.telefone.numero, "Número do telefone");

        if (!input.telefone.tipo) {
            throw new ValidationError("Tipo do telefone é obrigatório");
        }

        this.validarTexto(input.endereco.logradouro, "Logradouro");
        this.validarTexto(input.endereco.numero, "Número do endereço");
        this.validarTexto(input.endereco.cep, "CEP");
        this.validarTexto(input.endereco.bairro, "Bairro");
        this.validarTexto(input.endereco.complemento, "Complemento");
    }

    private validarTexto(value: string, fieldName: string): void {
        if (!value || value.trim().length === 0) {
            throw new ValidationError(`${fieldName} é obrigatório`);
        }
    }

    private validarData(value: Date, fieldName: string): void {
        if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
            throw new ValidationError(`${fieldName} é obrigatória`);
        }
    }
}
