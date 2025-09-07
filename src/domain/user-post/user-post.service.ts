import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { DomainException } from 'src/core/exception/domain.exception';
import { UserService } from '../user/user.service';
import { UserPostRepository } from './user-post.repository';
import { UserPostRequest } from './user-post.request';
import { UserPostResponse } from './user-post.response';

@Injectable()
export class UserPostService extends BaseService<UserPostRequest, UserPostResponse> {
    constructor(protected readonly repository: UserPostRepository, protected userService: UserService) {
        super(repository);
    }

    async createFromUser(userId: number, request: UserPostRequest) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new DomainException('O usuário informado não existe.');
        }
        return this.repository.get().create({
            data: {
                title: request.title,
                description: request.description,
                user: { connect: { id: userId } },
            },
        });
    }

    listFromUser(userId: number) {
        return this.repository.get().findMany({ where: { userId } });
    }
}
