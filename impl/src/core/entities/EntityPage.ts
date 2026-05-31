import { AbstractEntity } from "./AbstractEntity";

export class EntityPage<E extends AbstractEntity> {
    public constructor(
        public readonly entities: E[],
        public readonly paginaAtual: number,
        public readonly quantidade: number,
        public readonly ordenacao: "ASC" | "DESC",
        public readonly total: number,
    ) { }
}
