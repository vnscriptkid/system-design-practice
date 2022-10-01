<template>
  <div class="container-fluid">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Catalog from './components/Catalog/Catalog.vue';

export default {
  name: 'App',
  components: {
    Catalog,
  },
};
</script>
<style>
@import'~bootstrap/dist/css/bootstrap.css'
</style>
