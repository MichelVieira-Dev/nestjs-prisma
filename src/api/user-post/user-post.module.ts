import { Module } from '@nestjs/common';
import { BaseMapper } from 'src/core/util/base.mapper';
import { UserPostRepository } from 'src/domain/user-post/user-post.repository';
import { UserPostService } from 'src/domain/user-post/user-post.service';
import { UserModule } from '../user/user.module';
import { UserPostController } from './user-post.controller';

@Module({
    imports: [UserModule],
    controllers: [UserPostController],
    providers: [UserPostService, UserPostRepository, BaseMapper],
    exports: [],
})
export class UserPostModule {}
