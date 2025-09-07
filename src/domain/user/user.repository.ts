import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseRepository } from 'src/core/base.repository';

@Injectable()
export class UserRepository extends BaseRepository {
    get() {
        return this.repository.user;
    }

    async findByEmail(email: string): Promise<User> {
        return this.get().findUnique({ where: { email } });
    }
}
