<template>
  <router-link :to="{ name: 'product-show', params: { id: product.id } }" class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title text-center">{{ product.name }}</h5>
      <p class="card-text text-justify">{{ shortDescription }}</p>
      <p class="card-text text-center">${{ product.price }}</p>
        <vue3-star-ratings
          class="m-0 p-0"
          :showControl="false"
          :disableClick="true"
          inactiveColor="gray"
          starSize="28"
          v-model="averageRating"/>
    </div>
  </router-link>
</template>
<script>
import { computed, ref } from 'vue';
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    }
  },

  setup(props) {
    const averageRating = ref(Number(props.product.averageRating));

    const shortDescription = computed(() => {
      return props.product.description.length > 97
        ? `${props.product.description.slice(0, 97)}...`
        : props.product.description;
    });

    return {
      averageRating,
      shortDescription,
    };
  }
}
</script>
<style scoped>
a {
  color: black;
  text-decoration: none;
}
.card:hover {
  color: #ff9800;
  text-decoration: none;
}
</style>
