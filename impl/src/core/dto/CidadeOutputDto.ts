import { OutputDto } from "./OutputDto";

export class CidadeOutputDto extends OutputDto {
    public constructor(
        public readonly id: number | null,
        public readonly nome: string,
        public readonly estadoId: number | null,
        public readonly estadoNome: string,
        public readonly estadoUf: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly active: boolean,
    ) {
        super();
    }
}
