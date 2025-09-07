import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/base.repository';

@Injectable()
export class UserPostRepository extends BaseRepository {
    get() {
        return this.repository.userPost;
    }
}
