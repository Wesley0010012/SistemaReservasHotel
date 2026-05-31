import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProjectCustomErrorFilter } from './infra/http/filters/ProjectCustomErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ProjectCustomErrorFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
