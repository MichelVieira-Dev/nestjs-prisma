import { Body, Controller, Get, Post, Request, UseFilters } from '@nestjs/common';
import { BadRequestExceptionFilter } from 'src/config/bad-request-exception.filters';
import { Public } from 'src/core/decorators/public.decorator';
import { AuthService } from 'src/domain/auth/auth.service';
import { AuthRequest } from 'src/domain/auth/dto/auth.request';

@UseFilters(BadRequestExceptionFilter)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post()
    public async login(@Body() body: AuthRequest) {
        return await this.authService.login(body);
    }

    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
