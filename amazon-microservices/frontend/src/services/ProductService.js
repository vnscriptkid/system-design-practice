import Api from '@/services/ApiService';

export default class ProductService {
    constructor() {
        this.api = new Api();
    }

    async getProduct(id) {
        return await this.api.get(`products/${id}`);
    }

    async getProducts() {
        return await this.api.get('products');
    }

    async createProduct(categoryId, name, description, price) {
        return await this.api.post('products', {
            categoryId,
            name,
            description,
            price,
        });
    }
}