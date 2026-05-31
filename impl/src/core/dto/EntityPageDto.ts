import { OutputDto } from "./OutputDto";

export class EntityPageDto<Output extends OutputDto> {
    public constructor(
        public readonly entities: Output[],
        public readonly paginaAtual: number,
        public readonly quantidade: number,
        public readonly ordenacao: "ASC" | "DESC",
        public readonly total: number,
    ) { }
}
