import { Cidade } from "../entities/Cidade";
import { CidadeSearchParameters } from "../dto/CidadeSearchParameters";
import { IDao } from "./IDao";

export interface CidadesDao extends IDao<Cidade, CidadeSearchParameters> { }
