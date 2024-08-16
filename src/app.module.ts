import { Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './domain/prisma/prisma.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
    imports: [PrismaModule, UserModule, AuthModule],
    controllers: [],
})
export class AppModule {}
