<template>
<div class="text-center w-50 m-auto">
    <h1>Create Inventory</h1>
    <div class="form-group text-left">
      <label for="product">Product</label>
      <select v-model="inventory.productId" class="form-control" id="product">
        <option value="-1" selected>Please select a product</option>
        <option v-for="product of products" :key="product.id" :value="product.id">{{ product.name }}</option>
      </select>
    </div>
    <div class="form-group text-left">
      <label for="category">Warehouse</label>
      <select v-model="inventory.warehouseId" class="form-control" id="category">
        <option value="-1" selected>Please select a warehouse</option>
        <option v-for="warehouse of warehouses" :key="warehouse.id" :value="warehouse.id">{{ warehouse.name }}</option>
      </select>
    </div>
    <div class="form-group text-left">
      <label for="quantity">Quantity</label>
      <input v-model="inventory.quantity" type="number" class="form-control" placeholder="Quantity" id="quantity">
    </div>
    <button class="btn btn-primary" @click="createInventory">Save</button>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import ProductSerice from '@/services/ProductService';
import WarehouseSerice from '@/services/WarehouseService';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'InventoryCreate',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const inventory = ref({
      productId: route.query.productId || -1,
      warehouseId: -1,
      quantity: null,
    });
    const products = ref([]);
    const warehouses = ref([]);
    const productService = new ProductSerice();
    const warehouseService = new WarehouseSerice();

    onMounted(async () => {
      products.value = await productService.getProducts();
      warehouses.value = await warehouseService.getWarehouses();
    });

    const createInventory = async () => {
      const response = await warehouseService.createInventory(
        inventory.value.productId,
        inventory.value.warehouseId,
        inventory.value.quantity,
      );

      if (response === false) {
        return;
      }

      router.push({
        name: 'product-show',
        params: {
          id: inventory.value.productId,
        },
      });
    };

    return {
      products,
      inventory,
      createInventory,
      warehouses,
    };
  }
}
</script>
