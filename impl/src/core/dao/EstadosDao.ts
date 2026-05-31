import { Estado } from "../entities/Estado";
import { EstadoSearchParameters } from "../dto/EstadoSearchParameters";
import { IDao } from "./IDao";

export interface EstadosDao extends IDao<Estado, EstadoSearchParameters> { }
