import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UserPostModule } from './api/user-post/user-post.module';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './domain/prisma/prisma.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, UserModule, UserPostModule, AuthModule],
    controllers: [],
})
export class AppModule {}
