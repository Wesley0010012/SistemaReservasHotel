import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormCidadeEntity } from './infra/typeorm/entities/TypeormCidadeEntity';
import { TypeormEstadoEntity } from './infra/typeorm/entities/TypeormEstadoEntity';
import { TypeormHospedeEntity } from './infra/typeorm/entities/TypeormHospedeEntity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'reserva_hotel',
      password: process.env.DB_PASSWORD ?? 'reserva_hotel',
      database: process.env.DB_NAME ?? 'reserva_hotel',
      entities: [
        TypeormEstadoEntity,
        TypeormCidadeEntity,
        TypeormHospedeEntity,
      ],
      synchronize: process.env.TYPEORM_SYNCHRONIZE !== 'false',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
