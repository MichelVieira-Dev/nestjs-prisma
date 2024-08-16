import { Body, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { BadRequestExceptionFilter } from 'src/config/bad-request-exception.filters';
import { BaseService } from './base.service';
import { DomainException } from './exception/domain.exception';
import { BaseMapper } from './util/base.mapper';
import Paginate from './util/paginate';

/**
 * @param T - Entity
 * @param R - Response
 */
@UseFilters(BadRequestExceptionFilter)
export abstract class BaseController<T> {
    protected abstract service: BaseService<unknown, unknown>;
    constructor(
        protected readonly mapper: BaseMapper,
        protected requestSchema: ClassConstructor<unknown>,
        protected responseSchema: ClassConstructor<unknown>,
    ) {}

    @Get()
    public async list<T>(@Body() request: T): Promise<Paginate<T> | T[]> {
        const paginate = plainToInstance(Paginate, request as object, {
            excludeExtraneousValues: true,
        });

        if (paginate.page !== undefined && paginate.page !== null && paginate.size) {
            return this.mapper.toResponse(this.responseSchema, await this.service.findAllPaginate(paginate));
        }

        return this.mapper.toResponse(this.responseSchema, await this.service.findAll());
    }

    @Get(':id')
    public async findById(@Param('id', ParseIntPipe) id: number): Promise<T> {
        const response = await this.service.findById(id);
        if (!response) {
            throw new DomainException('Registro não existe');
        }
        return this.mapper.toResponse(this.responseSchema, response);
    }

    @Post()
    public async create<R>(@Body() payload: R): Promise<T> {
        const request = await this.mapper.toRequest(this.requestSchema, payload);
        return this.mapper.toResponse(this.responseSchema, await this.service.create(request as T));
    }

    @Put(':id')
    public async update<R>(@Param('id', ParseIntPipe) id: number, @Body() payload: R): Promise<T> {
        const request = await this.mapper.toRequest(this.requestSchema, payload);
        return this.mapper.toResponse(this.responseSchema, await this.service.update(id, request as T));
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.service.delete(id);
    }
}
