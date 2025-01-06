   type SortOrderType = 'ASC' | 'DESC'
declare interface FileterOptionsInterface {
    table: string;
    page?: number;
    limit?: number;
    sort?: string;
    sortOrder?: SortOrderType;
    fields?: string[]
    filters?: Record<string, any>;
}


export class ApiFeature {
    #_queryString: string | null = null
    #_filterOptions: FileterOptionsInterface

    constructor( tableName: string) {
        this.#_filterOptions = {
            table: tableName,
            page: 1,
            limit: 10,
            sort: 'id',
            sortOrder: 'ASC',
            fields: ['*'],
            filters: {},
        }
    }

    paginate() { }

    filter() { }

    limitFields() { }

    sort() { }

    getQuery(): string {
        return this.#_queryString;
    }
}