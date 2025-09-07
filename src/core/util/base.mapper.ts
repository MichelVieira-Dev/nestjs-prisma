import { BadRequestException, Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import Paginate from './paginate';

@Injectable()
export class BaseMapper {
    async toRequest<T>(requestSchema: ClassConstructor<unknown>, payload: T) {
        const request = plainToInstance(requestSchema, payload as object, {
            excludeExtraneousValues: true,
        });
        const errors = await validate(request as object);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return request;
    }

    toResponse<T, R>(responseSchema: ClassConstructor<unknown>, data: T[] | T | Paginate<unknown>): R {
        if (data instanceof Paginate) {
            return {
                ...data,
                content: data.content.map((el) =>
                    plainToInstance(responseSchema, el, { excludeExtraneousValues: true }),
                ),
            } as R;
        } else if (Array.isArray(data)) {
            return data.map((el) => plainToInstance(responseSchema, el, { excludeExtraneousValues: true })) as R;
        }
        return plainToInstance(responseSchema, data, { excludeExtraneousValues: true }) as R;
    }
}
