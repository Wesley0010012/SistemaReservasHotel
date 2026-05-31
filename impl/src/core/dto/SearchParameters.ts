export abstract class SearchParameters {
    public readonly paginaAtual?: number | string;
    public readonly quantidade?: number | string;
    public readonly ordenacao?: "ASC" | "DESC" | string;
}
