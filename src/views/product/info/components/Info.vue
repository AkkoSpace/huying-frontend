<template>
  <a-row flex justify-between>
    <a-button type="primary" icon="plus" @click="onAdd">
      {{ $t('btn.info.add') }}
    </a-button>
    <a-input-search
      :enter-button="true"
      :placeholder="$t('text.info.search')"
      style="width: 200px; margin-right: 10px"
    />
  </a-row>
  <a-row mt>
    <a-table :bordered="false" :columns="columns" :data="data" w-full>
      <template #brandId="{ record }">
        {{ brandList.find((item) => item.id === record.brandId)?.brandName }}
      </template>
      <template #categoryId="{ record }">
        {{
          categoryList.find((item) => item.id === record.categoryId)
            ?.productAttribute +
          '/' +
          categoryList.find((item) => item.id === record.categoryId)
            ?.productType
        }}
      </template>
      <template #operation="{ record }">
        <a-button mr type="text" size="mini" @click="onView(record.id)">
          <template #icon>
            <icon-eye />
          </template>
          {{ $t('btn.view') }}
        </a-button>
        <a-popconfirm
          :content="$t('content.delete')"
          position="left"
          type="warning"
          @ok="confirmDelete(record.id)"
        >
          <a-button type="text" size="mini">
            <template #icon>
              <icon-delete />
            </template>
            {{ $t('btn.delete') }}
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </a-row>
  <a-modal
    v-model:visible="isSave"
    :footer="false"
    :title="isAdd ? $t('title.info.add') : $t('title.info.edit')"
    :width="450"
  >
    <a-form ref="formRef" :model="form" auto-label-width>
      <a-form-item
        :label="$t('title.info.brandId')"
        :rules="[
          {
            required: true,
            message: $t('rules.info.brandId.required'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="brandId"
      >
        <a-select v-model="form.brandId" :placeholder="$t('ph.info.brandId')">
          <a-option v-for="item in brandList" :key="item.id" :value="item.id">
            {{ item.brandName }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label="$t('title.info.categoryId')"
        :rules="[
          {
            required: true,
            message: $t('rules.info.categoryId.required'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="categoryId"
      >
        <a-select
          v-model="form.categoryId"
          :placeholder="$t('ph.info.categoryId')"
        >
          <a-option
            v-for="item in categoryList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.productAttribute + '/' + item.productType }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label="$t('title.info.productName')"
        :rules="[
          {
            required: true,
            message: $t('rules.info.productName.required'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="productName"
      >
        <a-input
          v-model="form.productName"
          :placeholder="$t('ph.info.productName')"
        />
      </a-form-item>
      <a-form-item
        :label="$t('title.info.barCode')"
        :rules="[
          {
            max: 20,
            message: $t('rules.info.barCode.max'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="barCode"
      >
        <a-input v-model="form.barCode" :placeholder="$t('ph.info.barCode')" />
      </a-form-item>
      <a-form-item
        :label="$t('title.info.productSpec')"
        :rules="[
          {
            required: true,
            message: $t('rules.info.productSpec.required'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="productSpec"
      >
        <a-input
          v-model="form.productSpec"
          :placeholder="$t('ph.info.productSpec')"
        />
      </a-form-item>
      <a-form-item
        :label="$t('title.info.productUnit')"
        :rules="[
          {
            required: true,
            message: $t('rules.info.productUnit.required'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="productUnit"
      >
        <a-select
          v-model="form.productUnit"
          :placeholder="$t('ph.info.productUnit')"
          allow-create
        >
          <a-option>
            {{ t('text.info.productUnit.1') }}
          </a-option>
          <a-option>
            {{ t('text.info.productUnit.2') }}
          </a-option>
          <a-option>
            {{ t('text.info.productUnit.3') }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label="$t('title.info.purchasePrice')"
        :rules="[
          {
            required: true,
            message: $t('rules.info.purchasePrice.required'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="purchasePrice"
      >
        <a-input-number
          v-model="form.purchasePrice"
          :placeholder="$t('ph.info.purchasePrice')"
          :min="0"
          :allow-clear="true"
          :hide-button="true"
          :precision="2"
        >
          <template #prefix> RMB </template>
        </a-input-number>
      </a-form-item>
      <a-form-item
        :label="$t('title.info.standardPrice')"
        :rules="[
          {
            required: true,
            message: $t('rules.info.standardPrice.required'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        field="standardPrice"
      >
        <a-input-number
          v-model="form.standardPrice"
          :placeholder="$t('ph.info.standardPrice')"
          :min="0"
          :allow-clear="true"
          :hide-button="true"
          :precision="2"
        >
          <template #prefix> RMB </template>
        </a-input-number>
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
    getProductInfo,
    addProductInfo,
    deleteProductInfo,
    updateProductInfo,
    getProductBrand,
    getProductCategory,
  } from '@/api/product';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';

  const { t } = useI18n();

  const columns = [
    {
      title: t('title.info.brandId'),
      slotName: 'brandId',
    },
    {
      title: t('title.info.categoryId'),
      slotName: 'categoryId',
    },
    {
      title: t('title.info.productName'),
      dataIndex: 'productName',
    },
    {
      title: t('title.info.barCode'),
      dataIndex: 'barCode',
    },
    {
      title: t('title.info.productSpec'),
      dataIndex: 'productSpec',
    },
    {
      title: t('title.info.productUnit'),
      dataIndex: 'productUnit',
    },
    {
      title: t('title.info.purchasePrice'),
      dataIndex: 'purchasePrice',
    },
    {
      title: t('title.info.standardPrice'),
      dataIndex: 'standardPrice',
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
    brandId: '',
    categoryId: '',
    productName: '',
    barCode: '',
    productSpec: '',
    productUnit: '',
    purchasePrice: '',
    standardPrice: '',
  });

  function getData() {
    getProductInfo().then((res) => {
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
        addProductInfo(form.value).then((res: any) => {
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
        // await updateProductInfo({
        //   id: operationId.value,
        //   ...form.value,
        // }).then((res: any) => {
        //   if (res.code === 20000) {
        //     getData();
        //     isSave.value = false;
        //     isAdd.value = false;
        //     formRef.value.resetFields();
        //   }
        // });
      }
    });
  };

  const onView = (id: number) => {
    operationId.value = id;
  };

  const confirmDelete = (id: number) => {
    deleteProductInfo(id).then((res: any) => {
      if (res.code === 20000) {
        Message.success(t('message.delete.success'));
        getData();
      }
    });
  };

  const brandList = ref();
  const categoryList = ref();
  function getListData() {
    getProductBrand().then((res) => {
      brandList.value = res.data;
    });
    getProductCategory().then((res) => {
      categoryList.value = res.data;
    });
  }

  onMounted(() => {
    getData();
    getListData();
  });
</script>
