import { Expose } from 'class-transformer';

export class UserPostResponse {
    @Expose()
    id?: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    userId: number;
}
