import Api from '@/services/ApiService';

export default class CatalogService {
    constructor() {
        this.api = new Api();
    }

    async getCatalog(searchTerm, sortBy, sortDirection) {
        return await this.api.get('catalog', {
            searchTerm,
            sortBy,
            sortDirection,
        });
    }
}