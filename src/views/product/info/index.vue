<template>
  <div h-full pt-4 px-4>
    <a-card h-full>
      <n-h2 prefix="bar" type="info">
        <a-typography-text>
          {{ $t('text.productInfo') }}
        </a-typography-text>
      </n-h2>
      <a-tabs type="rounded">
        <a-tab-pane key="1" :title="$t('title.info')">
          <Info />
        </a-tab-pane>
        <a-tab-pane key="2" :title="$t('title.category')">
          <Category />
        </a-tab-pane>
        <a-tab-pane key="3" :title="$t('title.brand')">
          <Brand />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import Info from '@/views/product/info/components/Info.vue';
  import Brand from '@/views/product/info/components/Brand.vue';
  import Category from '@/views/product/info/components/Category.vue';
</script>

<script lang="ts">
  export default {
    name: 'ProductInfo', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>
