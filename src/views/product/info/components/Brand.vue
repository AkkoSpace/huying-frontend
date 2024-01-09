<template>
  <a-row :gutter="20" :style="{ marginBottom: '20px' }">
    <a-col :span="6">
      <a-card title="Arco Card" :style="{ width: '100%' }">
        <template #extra>
          <a-link>More</a-link>
        </template>
        Card content
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="Arco Card" :style="{ width: '100%' }">
        <template #extra>
          <a-link>More</a-link>
        </template>
        Card content
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="Arco Card" :style="{ width: '100%' }">
        <template #extra>
          <a-link>More</a-link>
        </template>
        Card content
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="Arco Card" :style="{ width: '100%' }">
        <template #extra>
          <a-link>More</a-link>
        </template>
        Card content
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="Arco Card" :style="{ width: '100%' }">
        <template #extra>
          <a-link>More</a-link>
        </template>
        Card content
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="Arco Card" :style="{ width: '100%' }">
        <template #extra>
          <a-link>More</a-link>
        </template>
        Card content
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getProductBrand } from '@/api/product';

  const data = ref();

  onMounted(() => {
    getProductBrand().then((res) => {
      data.value = res.data;
    });
  });
</script>
