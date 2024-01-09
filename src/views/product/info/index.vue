<template>
  <div h-full px-4 pt-4>
    <a-card h-full>
      <n-h3 prefix="bar" type="info">
        <a-typography-text>
          {{ $t('title.product') }}
        </a-typography-text>
      </n-h3>
      <a-tabs type="rounded">
        <a-tab-pane key="1" :title="$t('tab.title.info')">
          <Info />
        </a-tab-pane>
        <a-tab-pane key="2" :title="$t('tab.title.brand')">
          <Brand />
        </a-tab-pane>
        <a-tab-pane key="3" :title="$t('tab.title.category')">
          <Category />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import Info from '@/views/product/info/components/Info.vue';
  import Brand from '@/views/product/info/components/Brand.vue';
  import Category from '@/views/product/info/components/Category.vue';

  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<script lang="ts">
  export default {
    name: 'ProductInfo', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>
