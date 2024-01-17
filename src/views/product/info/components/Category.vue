<template>
  <a-row flex justify-between>
    <a-button type="primary" icon="plus" @click="onAdd">
      {{ $t('btn.category.add') }}
    </a-button>
    <a-input-search
      :enter-button="true"
      :placeholder="$t('text.category.search')"
      style="width: 200px; margin-right: 10px"
    />
  </a-row>
  <a-row mt>
    <a-table :bordered="false" :columns="columns" :data="data" w-full>
      <template #operation="{ record }">
        <a-button mr type="text" size="mini" @click="onView(record.id)">
          <template #icon>
            <icon-eye />
          </template>
          {{ $t('common.btn.view') }}
        </a-button>
        <a-popconfirm
          :content="$t('common.content.delete')"
          position="left"
          type="warning"
          @ok="confirmDelete(record.id)"
        >
          <a-button type="text" size="mini">
            <template #icon>
              <icon-delete />
            </template>
            {{ $t('common.btn.delete') }}
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </a-row>
  <a-modal
    v-model:visible="isSave"
    :footer="false"
    :title="isAdd ? $t('title.category.add') : $t('title.category.edit')"
    :width="450"
  >
    <a-form ref="formRef" :model="form" auto-label-width>
      <a-form-item
        :label="$t('title.category.productAttribute')"
        :rules="[
          {
            required: true,
            message: $t('rules.category.productAttribute.required'),
          },
          {
            max: 10,
            message: $t('rules.category.productAttribute.max'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="productAttribute"
      >
        <a-input
          v-model="form.productAttribute"
          :placeholder="$t('ph.category.productAttribute')"
        />
      </a-form-item>
      <a-form-item
        :label="$t('title.category.productType')"
        :rules="[
          {
            required: true,
            message: $t('rules.category.productType.required'),
          },
          { max: 10, message: $t('rules.category.productType.max') },
        ]"
        :validate-trigger="['change', 'blur']"
        field="productType"
      >
        <a-input
          v-model="form.productType"
          :placeholder="$t('ph.category.productType')"
        />
      </a-form-item>
    </a-form>
    <a-space flex justify-end>
      <a-button @click="cancelSave">
        {{ $t('text.cancel') }}
      </a-button>
      <a-button v-if="isAdd" type="primary" @click="confirmAdd">
        {{ $t('text.confirm') }}
      </a-button>
      <a-button v-else type="primary" @click="confirmEdit">
        {{ $t('text.confirm') }}
      </a-button>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import {
    getProductCategory,
    addProductCategory,
    deleteProductCategory,
    updateProductCategory,
  } from '@/api/product';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';

  const { t } = useI18n();

  const columns = [
    {
      title: t('title.category.productAttribute'),
      dataIndex: 'productAttribute',
    },
    {
      title: t('title.category.productType'),
      dataIndex: 'productType',
    },
    {
      title: t('title.operation'),
      slotName: 'operation',
      width: 200,
      align: 'center',
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

  function getData() {
    getProductCategory().then((res) => {
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

  const confirmAdd = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        addProductCategory(form.value).then((res: any) => {
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
        await updateProductCategory({
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

  const onView = (id: number) => {
    operationId.value = id;
  };

  const confirmDelete = (id: number) => {
    deleteProductCategory(id).then((res: any) => {
      if (res.code === 20000) {
        Message.success(t('message.delete.success'));
        getData();
      }
    });
  };

  onMounted(() => {
    getData();
  });
</script>
