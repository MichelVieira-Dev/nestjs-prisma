import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseController } from 'src/core/base.controller';
import { BaseMapper } from 'src/core/util/base.mapper';
import { UserPostRequest } from 'src/domain/user-post/user-post.request';
import { UserPostResponse } from 'src/domain/user-post/user-post.response';
import { UserPostService } from 'src/domain/user-post/user-post.service';

@Controller('post')
export class UserPostController extends BaseController<User> {
    constructor(protected service: UserPostService, protected mapper: BaseMapper) {
        super(mapper, UserPostRequest, UserPostResponse);
    }

    @Post('user/:userId')
    createPost(@Param('userId', ParseIntPipe) userId: number, @Body() postRequest: UserPostRequest) {
        return this.mapper.toResponse(UserPostResponse, this.service.createFromUser(userId, postRequest));
    }

    @Get('user/:userId')
    listPosts(@Param('userId', ParseIntPipe) userId: number) {
        return this.mapper.toResponse(UserPostResponse, this.service.listFromUser(userId));
    }
}
