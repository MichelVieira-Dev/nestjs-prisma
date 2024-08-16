import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from './exceptions/validation.exception';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();

        if (!Array.isArray(exceptionResponse?.message)) {
            return response.status(status).json(exception);
        }

        const newException = new ValidationException(exception);
        response.status(status).json(newException?.getResponse());
    }
}
