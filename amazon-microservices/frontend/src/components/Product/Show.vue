<template>
  <div class="text-center">
    <div class="row">
      <div class="col-10">
        <h1>{{ product.name }}</h1>
        <vue3-star-ratings
          v-if="averageRating !== null"
          class="m-3 p-3"
          :showControl="false"
          :disableClick="true"
          inactiveColor="gray"
          starSize="28"
          v-model="averageRating"/>
        <div class="font-weight-bold">${{ product.price }}</div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8">
            <p class="text-justify mt-2">{{ product.description }}</p>
          </div>
          <div class="col-2"></div>
        </div>
        <div>
          <p class="font-weight-bold">Available quantity: {{ totalInventory }}</p>
          <router-link :to="{ name: 'inventory-create', query: { productId: product.id }}">Add Inventory</router-link>
        </div>
        <div class="row text-center">
          <div class="col-3"></div>
          <div class="col-6">
            <h5 class="mt-5">Ratings</h5>
            <RatingList v-for="rating of productRatings?.ratings" :productRating="rating" :key="rating.productId" />
            <h5 class="mt-5">Rate this product</h5>
            <RatingCreate @productRated="rateProduct" :productId="productId" />
          </div>
          <div class="col-3"></div>
        </div>
      </div>
      <div class="col-1 pt-5">
        <h5>Buy this product</h5>
        <div class="form-group">
          <input v-model="quantity" type="number" class="form-control">
        </div>
        <button @click="buyProduct" class="btn btn-link">Buy now</button>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>
<script>
import router from '@/router';
import RatingList from '@/components/Rating/List.vue';
import RatingCreate from '@/components/Rating/Create.vue';
import ProductService from '@/services/ProductService';
import RatingService from '@/services/RatingService';
import WarehouseService from '@/services/WarehouseService';
import OrderService from '@/services/OrderService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ProductShow',
  components: { RatingList, RatingCreate },
  setup() {
    const route = useRoute();
    const productId = ref(Number(route.params.id));

    const product = ref({});
    const productRatings = ref({});
    const averageRating = ref(null);
    const totalInventory = ref(0);
    const quantity = ref(1);

    const productService = new ProductService();
    const ratingService = new RatingService();
    const warehouseService = new WarehouseService();
    const orderService = new OrderService();

    const fetchRatings = async () => {
      return await ratingService.getProductRatings(router.currentRoute.value.params.id);
    };

    const fetchInventory = async () => {
      return await warehouseService.getTotalInventory(router.currentRoute.value.params.id)
    };

    onMounted(async () => {
      product.value = await productService.getProduct(router.currentRoute.value.params.id);
      productRatings.value = await fetchRatings();
      totalInventory.value = await fetchInventory();
      averageRating.value = Number(productRatings.value.averageRating);
    });

    const rateProduct = async data => {
      await ratingService.rateProduct(
        data.productId,
        data.rating,
        data.comment
      );

      productRatings.value = await fetchRatings();
    };

    const buyProduct = async () => {
      const isConfirmed = window.confirm(`You're about to purchase ${quantity.value} of ${product.value.name}. Are you sure?`);
      if (!isConfirmed) {
        return;
      }

      await orderService.createOrder(product.value.id, quantity.value);
      totalInventory.value = await fetchInventory();
      quantity.value = 1;

      window.alert('Thank you for your order!');
    };

    return {
      product,
      productRatings,
      averageRating,
      totalInventory,
      rateProduct,
      quantity,
      buyProduct,
      productId,
    };
  }
}
</script>
