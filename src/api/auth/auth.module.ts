import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/domain/user/user.repository';
import { AuthService } from 'src/domain/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRES_TIME },
        }),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        UserRepository,
        AuthService,
    ],
})
export class AuthModule {}
