<template>
<div>
  <vue3-star-ratings
    class="m-3 p-3"
    :showControl="false"
    :disableClick="true"
    inactiveColor="gray"
    starSize="28"
    v-model="rating"/>
  <div class="mb-2">on {{ productRating.createdAt }}</div>
  <div class="text-justify">{{ productRating.comment }}</div>
</div>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'ProductRatingList',
  props: {
    productRating: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const rating = ref(Number(props.productRating.rating));

    return {
      rating,
    };
  }
}
</script>

