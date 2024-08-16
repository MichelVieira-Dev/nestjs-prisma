import { Expose } from 'class-transformer';

export class UserResponse {
    @Expose()
    id?: number;

    @Expose()
    email: string;

    @Expose()
    name: string;
}
