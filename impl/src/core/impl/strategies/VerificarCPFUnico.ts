import { ValidationError } from "project-custom-errors";
import { HospedesDao } from "../../dao/HospedesDao";
import { Hospede } from "../../entities/Hospede";
import { IStrategy } from "../../protocols/IStrategy";

export class VerificarCPFUnico implements IStrategy<Hospede, void> {
    public constructor(
        private readonly hospedesDao: HospedesDao
    ) {

    }

    public async execute(input: Hospede): Promise<void> {
        if (await this.hospedesDao.existsByCPF(input.cpf)) {
            throw new ValidationError("CPF já cadastrado", input.cpf.numero);
        }
    }
}
