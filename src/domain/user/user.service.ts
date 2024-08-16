import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/core/base.service';
import { UserRepository } from './user.repository';
import { UserRequest } from './user.request';
import { UserResponse } from './user.response';

@Injectable()
export class UserService extends BaseService<UserRequest, UserResponse> {
    constructor(protected readonly repository: UserRepository) {
        super(repository);
    }

    async create(request: UserRequest) {
        const rounds = 10;
        const password = await bcrypt.hash(request.password, rounds);
        request.password = password;
        return this.repository.create<UserResponse>(await this.validate(request));
    }

    async update(id: number, request: UserRequest) {
        const userEntity = await this.findById(id);
        userEntity.email = request.email;
        userEntity.name = request.name;
        return this.repository.update<UserResponse>(id, await this.validate(userEntity));
    }
}
