import { ValidationError } from "project-custom-errors";
import { HospedesDao } from "src/core/dao/HospedesDao";
import { Hospede } from "src/core/entities/Hospede";
import { IStrategy } from "src/core/protocols/IStrategy";

export class VerificarEmailUnico implements IStrategy<Hospede, void> {
    public constructor(
        private readonly hospedesDao: HospedesDao,
    ) { }

    public async execute(input: Hospede): Promise<void> {
        if (await this.hospedesDao.existsByEmail(input.email)) {
            throw new ValidationError("E-mail já cadastrado", input.email.endereco);
        }
    }
}
