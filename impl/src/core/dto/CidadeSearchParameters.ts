import { SearchParameters } from "./SearchParameters";

export class CidadeSearchParameters extends SearchParameters {
    public readonly nome?: string;
    public readonly estadoId?: number | string;
}
