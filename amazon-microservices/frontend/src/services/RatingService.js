import Api from '@/services/ApiService';

export default class RatingService {
    constructor() {
        this.api = new Api();
    }

    async getProductRatings(productId) {
        return await this.api.get(`products/${productId}/ratings`);
    }

    async rateProduct(productId, rating, comment) {
        return await this.api.post(`products/${productId}/ratings`, {
            rating,
            comment,
        });
    }
}