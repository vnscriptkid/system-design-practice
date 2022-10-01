import Api from '@/services/ApiService';

export default class WarehouseService {
    constructor() {
        this.api = new Api();
    }

    async getTotalInventory(productId) {
        const { totalInventory } = await this.api.get(`inventory/products/${productId}`);
        return totalInventory;
    }

    async getWarehouses() {
        return this.api.get('warehouses');
    }

    async createInventory(productId, warehouseId, quantity) {
        return this.api.post('inventory', {
            productId,
            warehouseId,
            quantity,
        });
    }
}