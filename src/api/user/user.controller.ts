import { Controller } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseController } from 'src/core/base.controller';
import { BaseMapper } from 'src/core/util/base.mapper';
import { UserRequest } from 'src/domain/user/user.request';
import { UserResponse } from 'src/domain/user/user.response';
import { UserService } from 'src/domain/user/user.service';

@Controller('user')
export class UserController extends BaseController<User> {
    constructor(protected service: UserService, protected mapper: BaseMapper) {
        super(mapper, UserRequest, UserResponse);
    }
}
