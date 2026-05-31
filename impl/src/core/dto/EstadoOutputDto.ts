import { OutputDto } from "./OutputDto";

export class EstadoOutputDto extends OutputDto {
    public constructor(
        public readonly id: number | null,
        public readonly nome: string,
        public readonly uf: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly active: boolean,
    ) {
        super();
    }
}
