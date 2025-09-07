import { Exclude, Expose } from 'class-transformer';

export class Paginate<T> {
    @Expose()
    page: number;

    @Expose()
    size: number;

    @Expose()
    sort: any;

    @Exclude()
    total?: number;

    @Exclude()
    totalPages?: number;

    @Exclude()
    content?: T[];

    setPaginate(content: T[], total: number) {
        this.total = total;
        const modulo = total % this.size;
        this.totalPages = (total - modulo) / this.size + (modulo === 0 ? 0 : 1);
        this.content = content;
    }

    getParams() {
        return { skip: this.size * this.page, take: this.size };
    }
}

export default Paginate;
