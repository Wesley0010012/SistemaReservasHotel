import { Hospede } from "../entities/Hospede";
import { HospedeSearchParameters } from "../dto/HospedeSearchParameters";
import { CPF } from "../vo/CPF";
import { Email } from "../vo/Email";
import { IDao } from "./IDao";

export interface HospedesDao extends IDao<Hospede, HospedeSearchParameters> {
    existsByCPF(cpf: CPF): Promise<boolean>
    existsByEmail(email: Email): Promise<boolean>
}
