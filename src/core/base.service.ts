import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { DomainException } from './exception/domain.exception';
import { Paginate } from './util/paginate';

export interface IBaseService<T, R> {
    findAll(): Promise<R[]>;

    findById(id: number): Promise<R>;

    create(request: T): Promise<R>;

    update(id: number, request: unknown): Promise<R>;

    delete(id: number): Promise<boolean>;
}

@Injectable()
export class BaseService<T, R> implements IBaseService<T, R> {
    constructor(protected readonly repository: BaseRepository) {}

    async findAllPaginate<Q = T>(paginate: Paginate<Q>): Promise<Paginate<R>> {
        return this.repository.findAllPaginate(paginate as unknown as Paginate<R>);
    }

    async findAll(): Promise<R[]> {
        return this.repository.findAll();
    }

    async findById(id: number): Promise<R> {
        return this.repository.findById(id);
    }

    async validate(request: T) {
        return request;
    }

    async create(request: T): Promise<R> {
        return this.repository.create(await this.validate(request));
    }

    async update(id: number, request: T): Promise<R> {
        return this.repository.update(id, await this.validate(request));
    }

    async delete(id: number): Promise<boolean> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new DomainException('Registro não encontrado.');
        }
        await this.repository.delete(id);
        return true;
    }
}
