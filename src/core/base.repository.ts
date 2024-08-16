import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/domain/prisma/prisma.service';
import Paginate from './util/paginate';

@Injectable()
export abstract class BaseRepository {
    constructor(protected readonly repository: PrismaService) {}

    abstract getRepository(): any;

    async findAllPaginate<R, T extends Paginate<R>>(paginate: T): Promise<Paginate<R>> {
        const [list, count] = await this.repository.$transaction([
            this.getRepository().findMany(paginate.getParams()),
            this.getRepository().count({ where: {} }),
        ]);
        paginate.setPaginate(list, count);
        return paginate;
    }

    async findAll<T>(): Promise<T[]> {
        return this.getRepository().findMany();
    }

    async findById<T>(id: number): Promise<T> {
        return this.getRepository().findUnique({
            where: { id },
        });
    }

    async create<T>(data: any): Promise<T> {
        return this.getRepository().create({
            data,
        });
    }

    async update<T>(id: number, data: any): Promise<T> {
        return this.getRepository().update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<boolean> {
        await this.getRepository().delete({
            where: { id },
        });
        return true;
    }
}
