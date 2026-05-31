import { ValidationError } from "project-custom-errors";
import { Hospede } from "src/core/entities/Hospede";
import { IStrategy } from "src/core/protocols/IStrategy";

export class ValidarEmail implements IStrategy<Hospede, void> {
    private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public async execute(input: Hospede): Promise<void> {
        if (!this.emailRegex.test(input.email.endereco)) {
            throw new ValidationError("E-mail inválido", input.email.endereco);
        }
    }
}
