import { SearchParameters } from "./SearchParameters";

export class EstadoSearchParameters extends SearchParameters {
    public readonly nome?: string;
    public readonly uf?: string;
}
