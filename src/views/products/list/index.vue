<template>
  <div h-full>
    <div h-full pt-5 px-4>
      <a-card h-full p-2>
        <a-row>
          <n-h4 align-text prefix="bar" type="info">
            <n-text type="info">
              {{ $t('title.products.page') }}
            </n-text>
          </n-h4>
        </a-row>
        <a-row> 2 </a-row>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
  export default {
    name: 'ProductsList', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>
