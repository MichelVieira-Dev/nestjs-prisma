import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { AuthRequest } from './dto/auth.request';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userRepository: UserRepository) {}

    async login({ email, password }: AuthRequest) {
        const user = await this.userRepository.findByEmail(email);
        if (await bcrypt.compare(password, user?.password)) {
            const access_token = await this.jwtService.signAsync(
                { email: user?.email, name: user.name },
                { expiresIn: process.env.TOKEN_EXPIRES_TIME },
            );
            return { access_token };
        }
        throw new UnauthorizedException();
    }
}
