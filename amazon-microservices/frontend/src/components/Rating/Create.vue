<template>
  <div>
    <vue3-star-ratings
      :disableClick="true"
      class="mt-2"
      inactiveColor="gray"
      starSize="28"
      v-model="rating" />
    <div class="form-group">
      <textarea v-model="comment" name="comment" cols="30" rows="5" class="form-control"></textarea>
    </div>
    <button class="btn btn-primary" @click.prevent="save">Save</button>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'RatingCreate',
  emits: ['productRated'],
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const rating = ref(1);
    const comment = ref('');

    const save = async () => {
      emit('productRated', {
        productId: props.productId,
        rating: rating.value,
        comment: comment.value,
      });
      comment.value = '';
    };

    return {
      rating,
      comment,
      save,
    };
  }
}
</script>
