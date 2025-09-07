import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/domain/prisma/prisma.service';
import Paginate from './util/paginate';

@Injectable()
export abstract class BaseRepository {
    constructor(protected readonly repository: PrismaService) {}

    abstract get(): any;

    async findAllPaginate<R, T extends Paginate<R>>(paginate: T): Promise<Paginate<R>> {
        const [list, count] = await this.repository.$transaction([
            this.get().findMany(paginate.getParams()),
            this.get().count({ where: {} }),
        ]);
        paginate.setPaginate(list, count);
        return paginate;
    }

    async findAll<T>(): Promise<T[]> {
        return this.get().findMany();
    }

    async findById<T>(id: number): Promise<T> {
        return this.get().findUnique({
            where: { id },
        });
    }

    async create<T>(data: any): Promise<T> {
        return this.get().create({
            data,
        });
    }

    async update<T>(id: number, data: any): Promise<T> {
        return this.get().update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<boolean> {
        await this.get().delete({
            where: { id },
        });
        return true;
    }
}
