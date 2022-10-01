<template>
  <div v-if="showFilters" class="text-center mb-3">
    <div class="form-group">
      <input v-model="filters.searchTerm" type="text" placeholder="Search term" class="form-control">
    </div>
    <div class="form-group">
      <select v-model="filters.sortBy" name="sortBy" class="form-control">
        <option v-for="option of sortOptions" :selected="option.selected" :value="option.value" :key="option.value">{{ option.label }}</option>
      </select>
    </div>
    <div class="form-group">
      <select v-model="filters.sortDirection" name="sortDirection" class="form-control">
        <option v-for="direction of sortDirections" :selected="direction.selected" :value="direction.value" :key="direction.value">{{ direction.label }}</option>
      </select>
    </div>
    <button @click="onFilterClick" type="submit" class="btn btn-primary">Filter</button>
    <button class="btn btn-link" @click="showFilters = false">Hide filters</button>
  </div>
  <div v-else class="text-center">
    <button class="btn btn-link" @click="showFilters = true">Show filters</button>
  </div>
</template>
<script>
import { ref } from 'vue';
export default  {
  name: 'CatalogFilter',
  emits: ['filtersApplied'],
  setup(props, { emit }) {
    const filters = ref({
      searchTerm: null,
      sortBy: 'price',
      sortDirection: 'desc',
    });
    const showFilters = ref(false);

    const sortOptions = ref([
      {value: 'name', selected: false, label: 'Name'},
      {value: 'price', selected: true, label: 'Price'},
    ]);
    const sortDirections = ref([
      {value: 'asc', selected: false, label: 'Ascending'},
      {value: 'desc', selected: true, label: 'Descending'},
    ]);

    const onFilterClick = () => {
      if (filters.value.searchTerm === '') {
        filters.value.searchTerm = null;
      }

      emit('filtersApplied', filters.value);
    };

    return {
      filters,
      showFilters,
      sortOptions,
      sortDirections,
      onFilterClick,
    };
  }
}
</script>
