import Api from '@/services/ApiService';

export default class OrderService {
    constructor() {
        this.api = new Api();
    }

    async createOrder(productId, quantity) {
        return await this.api.post('orders', {
            productId,
            quantity,
        });
    }
}