<template>
  <a-table :columns="columns" :data="data" :bordered="false" />
</template>

<script setup lang="ts">
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
  ];

  const data = [];
</script>
