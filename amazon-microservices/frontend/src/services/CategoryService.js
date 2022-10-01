import Api from '@/services/ApiService';

export default class CategoryService {
    constructor() {
        this.api = new Api();
    }

    async getCategories() {
        return await this.api.get('categories');
    }
}