<template>
  <div>
    <h1 class="text-center mt-4">Product Catalog</h1>
    <div class="row">
      <div class="col-5"></div>
      <div class="col-2">
        <CatalogFilter @filtersApplied="applyFilters" />
      </div>
      <div class="col-5"></div>
    </div>
    <div class="text-center">
      <router-link :to="{ name: 'product-create' }">Create new product</router-link>
    </div>
    <div class="row align-items-center justify-content-center">
      <ProductCard class="m-4" v-for="product in catalog" :key="product.id" :product="product" />
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import CatalogFilter from '@/components/Catalog/Filter.vue';
import ProductCard from '@/components/Product/Card.vue';
import CatalogService from '@/services/CatalogService';

export default {
  components: { ProductCard, CatalogFilter },
  setup() {
    const filters = ref({});
    const catalog = ref({});
    const catalogService = new CatalogService();

    const fetchCatalog = async () => {
      catalog.value = await catalogService.getCatalog(
        filters.value.searchTerm,
        filters.value.sortBy,
        filters.value.sortDirection,
      );
    };

    onMounted(async () => {
      await fetchCatalog();
    });

    const applyFilters = async newFilters => {
      filters.value = newFilters;
      await fetchCatalog();
    };

    return {
      catalog,
      applyFilters,
      filters,
    };
  },
}
</script>
