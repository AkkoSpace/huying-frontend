<template>
  <a-row :gutter="[24, 12]">
    <a-col :span="6">
      <a-card flex h-xs items-center justify-center w-full @click="onAdd">
        <a-row justify-center>
          <icon-plus />
        </a-row>
        <a-row>
          {{ $t('product.brand.add') }}
        </a-row>
      </a-card>
    </a-col>
    <a-col v-for="item in data" :key="item.id" :span="6">
      <a-card flex h-xs items-center justify-center w-full>
        <a-row>
          {{ item.brandName }}
        </a-row>
      </a-card>
    </a-col>
  </a-row>
  <a-modal
    v-model:visible="isAdd"
    :title="$t('product.brand.add')"
    :width="350"
    :footer="false"
  >
    <a-form :model="form" auto-label-width>
      <a-form-item
        :label="$t('product.brand.label.brandName')"
        :rules="[
          {
            required: true,
            message: $t('product.brand.rules.brandName.required'),
          },
          { max: 10, message: $t('product.brand.rules.brandName.max') },
        ]"
        field="brandName"
      >
        <a-input
          v-model="form.brandName"
          :placeholder="$t('product.brand.ph.brandName')"
        />
      </a-form-item>
    </a-form>
    <a-space flex justify-end>
      <a-button @click="cancelAdd">
        {{ $t('product.brand.cancel') }}
      </a-button>
      <a-button type="primary" @click="confirmAdd">
        {{ $t('product.brand.confirm') }}
      </a-button>
    </a-space>
  </a-modal>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { addProductBrand, getProductBrand } from '@/api/product';

  const data = ref();
  const isAdd = ref(false);
  const form = ref({
    brandName: '',
  });

  const onAdd = () => {
    isAdd.value = true;
  };

  const cancelAdd = () => {
    isAdd.value = false;
    console.log('cancel', isAdd.value);
  };

  function getData() {
    getProductBrand().then((res) => {
      data.value = res.data;
    });
  }

  const confirmAdd = async () => {
    await addProductBrand(form.value).then((res: any) => {
      if (res.code === 20000) {
        form.value = {
          brandName: '',
        };
        getData();
      }
    });
  };

  onMounted(() => {
    getData();
  });
</script>
