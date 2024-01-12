<template>
  <a-row :gutter="[24, 12]">
    <a-col :span="6">
      <a-card flex h-xs items-center justify-center w-full @click="onAdd">
        <a-row>
          <a-typography-text>
            {{ $t('text.brand.add') }}
          </a-typography-text>
        </a-row>
        <a-row justify-center mt>
          <icon-plus />
        </a-row>
      </a-card>
    </a-col>
    <a-col v-for="item in data" :key="item.id" :span="6">
      <a-card flex h-xs items-center justify-center w-full>
        <a-row justify-center>
          <a-typography-title :heading="6">
            {{ item.brandName }}
          </a-typography-title>
        </a-row>
        <a-row justify-between mt>
          <span mr>
            <icon-edit @click="onEdit(item.id, item.brandName)" />
          </span>
          <a-popconfirm
            :content="$t('content.delete')"
            position="bottom"
            type="warning"
            @ok="confirmDelete(item.id)"
          >
            <span> <icon-delete /> </span>
          </a-popconfirm>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
  <a-modal
    v-model:visible="isSave"
    :footer="false"
    :title="
      isAdd ? $t('product.brand.title.add') : $t('product.brand.title.edit')
    "
    :width="350"
  >
    <a-form ref="formRef" :model="form" auto-label-width>
      <a-form-item
        :label="$t('product.brand.label.brandName')"
        :rules="[
          {
            required: true,
            message: $t('product.brand.rules.brandName.required'),
          },
          { max: 10, message: $t('product.brand.rules.brandName.max') },
        ]"
        :validate-trigger="['change', 'blur']"
        field="brandName"
      >
        <a-input
          v-model="form.brandName"
          :placeholder="$t('product.brand.ph.brandName')"
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

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import {
    addProductBrand,
    deleteProductBrand,
    getProductBrand,
    updateProductBrand,
  } from '@/api/product';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const data = ref();
  const isSave = ref(false);
  const isAdd = ref(false);
  const operationId = ref();
  const formRef = ref();
  const form = ref({
    brandName: '',
  });

  function getData() {
    getProductBrand().then((res) => {
      data.value = res.data;
    });
  }

  const onAdd = () => {
    isSave.value = true;
    isAdd.value = true;
  };

  const cancelSave = () => {
    isSave.value = false;
    isAdd.value = false;
    formRef.value.resetFields();
  };

  const confirmDelete = (id: number) => {
    deleteProductBrand(id).then((res: any) => {
      if (res.code === 20000) {
        Message.success(t('message.delete.success'));
        getData();
      }
    });
  };

  const onEdit = (id: any, brandName: string) => {
    operationId.value = id;
    form.value.brandName = brandName;
    isSave.value = true;
    isAdd.value = false;
  };

  const confirmAdd = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        await addProductBrand(form.value).then((res: any) => {
          if (res.code === 20000) {
            getData();
            isSave.value = false;
            isAdd.value = false;
            formRef.value.resetFields();
          }
        });
      }
    });
  };

  const confirmEdit = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        await updateProductBrand({
          id: operationId.value,
          ...form.value,
        }).then((res: any) => {
          if (res.code === 20000) {
            getData();
            isSave.value = false;
            isAdd.value = false;
            formRef.value.resetFields();
          }
        });
      }
    });
  };

  onMounted(() => {
    getData();
  });
</script>
