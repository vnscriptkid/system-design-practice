<template>
  <div class="text-center w-50 m-auto">
    <h1>Create a product</h1>
    <div class="form-group text-left">
      <label for="category">Category</label>
      <select v-model="product.categoryId" class="form-control" id="category">
        <option value="-1" selected>Please select a category</option>
        <option v-for="category of categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>
    <div class="form-group text-left">
      <label for="name">Name</label>
      <input v-model="product.name" type="text" class="form-control" placeholder="Name" id="name">
    </div>
    <div class="form-group text-left">
      <label for="description">Description</label>
      <textarea v-model="product.description" placeholder="Description" class="form-control" rows="5" id="description"></textarea>
    </div>
    <div class="form-group text-left">
      <label for="price">Price</label>
      <input v-model="product.price" type="number" class="form-control" placeholder="Price" id="price">
    </div>
    <button class="btn btn-primary" @click="createProduct">Save</button>
  </div>
</template>
<script>
import { onMounted, proxyRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import CategoryService from '@/services/CategoryService';
import ProductService from '@/services/ProductService';

export default {
  name: 'ProductCreate',
  setup() {
    const router = useRouter();
    const product = ref({
      name: '',
      description: '',
      price: null,
      categoryId: -1,
    });

    const categories = ref([]);
    const categoryService = new CategoryService();
    const productService = new ProductService();

    onMounted(async () => {
      categories.value = await categoryService.getCategories();
    });

    const createProduct = async () => {
      const productReponse = await productService.createProduct(
        product.value.categoryId,
        product.value.name,
        product.value.description,
        product.value.price,
      );

      if (productReponse === false) {
        return;
      }

      router.push({
        name: 'product-show',
        params: {
          id: productReponse.id,
        },
      });
    };

    return {
      product,
      categories,
      createProduct,
    };
  }
}
</script>
