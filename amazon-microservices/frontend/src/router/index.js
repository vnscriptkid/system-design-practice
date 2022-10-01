import Catalog from '@/components/Catalog/Catalog.vue';
import ProductShow from '@/components/Product/Show.vue';
import ProductCreate from '@/components/Product/Create.vue';
import InventoryCreate from '@/components/Inventory/Create.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', name: 'catalog', component: Catalog },
    { path: '/products/:id', name: 'product-show', component: ProductShow },
    { path: '/products/create', name: 'product-create', component: ProductCreate },
    { path: '/inventory/create', name: 'inventory-create', component: InventoryCreate },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;