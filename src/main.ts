import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: false,
            exceptionFactory(errors: ValidationError[]) {
                return new BadRequestException(errors);
            },
        }),
    );
    await app.listen(3000);
}
bootstrap();
