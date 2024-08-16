import { Module } from '@nestjs/common';
import { BaseMapper } from 'src/core/util/base.mapper';
import { UserRepository } from 'src/domain/user/user.repository';
import { UserService } from 'src/domain/user/user.service';
import { UserController } from './user.controller';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, UserRepository, BaseMapper],
    exports: [],
})
export class UserModule {}
