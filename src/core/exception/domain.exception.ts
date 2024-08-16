import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainException extends HttpException {
    constructor(public message: string) {
        super(
            { statusCode: HttpStatus.BAD_REQUEST, type: 'DomainException', message: message },
            HttpStatus.BAD_REQUEST,
        );
    }
}
