<template>
  <a-row flex justify-between>
    <a-button type="primary" icon="plus" @click="onAdd">
      {{ $t('product.category.add') }}
    </a-button>
    <a-input-search
      :enter-button="true"
      :placeholder="$t('product.category.search')"
      style="width: 200px; margin-right: 10px"
    />
  </a-row>
  <a-row mt>
    <a-table :bordered="false" :columns="columns" :data="data" w-full />
  </a-row>
  <a-modal
    v-model:visible="isSave"
    :footer="false"
    :title="isAdd ? $t('product.category.add') : $t('product.category.edit')"
    :width="450"
  >
    <a-form ref="formRef" :model="form" auto-label-width>
      <a-form-item
        :label="$t('product.category.productAttribute')"
        :rules="[
          {
            required: true,
            message: $t('product.category.rules.productAttribute.required'),
          },
          {
            max: 10,
            message: $t('product.category.rules.productAttribute.max'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="productAttribute"
      >
        <a-input
          v-model="form.productAttribute"
          :placeholder="$t('product.category.ph.productAttribute')"
        />
      </a-form-item>
      <a-form-item
        :label="$t('product.category.productType')"
        :rules="[
          {
            required: true,
            message: $t('product.category.rules.productType.required'),
          },
          { max: 10, message: $t('product.category.rules.productType.max') },
        ]"
        :validate-trigger="['change', 'blur']"
        field="productType"
      >
        <a-input
          v-model="form.productType"
          :placeholder="$t('product.category.ph.productType')"
        />
      </a-form-item>
    </a-form>
    <a-space flex justify-end>
      <a-button @click="cancelSave">
        {{ $t('product.cancel') }}
      </a-button>
      <a-button v-if="isAdd" type="primary" @click="confirmAdd">
        {{ $t('product.confirm') }}
      </a-button>
      <a-button v-else type="primary" @click="confirmEdit">
        {{ $t('product.confirm') }}
      </a-button>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getProductCategory } from '@/api/product';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const columns = [
    {
      title: t('product.category.productAttribute'),
      dataIndex: 'productAttribute',
    },
    {
      title: t('product.category.productType'),
      dataIndex: 'productType',
    },
  ];

  const data = ref();
  const isSave = ref(false);
  const isAdd = ref(false);
  const operationId = ref();
  const formRef = ref();
  const form = ref({
    productAttribute: '',
    productType: '',
  });

  const onAdd = () => {
    isSave.value = true;
    isAdd.value = true;
  };

  const cancelSave = () => {
    isSave.value = false;
    isAdd.value = false;
    formRef.value.resetFields();
  };

  onMounted(() => {
    getProductCategory().then((res) => {
      data.value = res.data;
    });
  });
</script>
