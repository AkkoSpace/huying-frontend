<template>
  <a-row flex justify-between>
    <a-button
      type="primary"
      icon="plus"
      @click="() => $router.push('/product/info/add')"
    >
      {{ $t('product.info.add') }}
    </a-button>
    <a-input-search
      :enter-button="true"
      :placeholder="$t('product.info.search')"
      style="width: 200px; margin-right: 10px"
    />
  </a-row>
  <a-row mt>
    <a-table :bordered="false" :columns="columns" :data="data" w-full />
  </a-row>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { getProductInfo } from '@/api/product';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
  ];

  const data = ref();

  onMounted(() => {
    getProductInfo().then((res) => {
      data.value = res.data;
    });
  });
</script>
