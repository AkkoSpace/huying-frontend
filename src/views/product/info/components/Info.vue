<template>
  <a-row flex justify-between>
    <a-button icon="plus" type="primary" @click="onAdd">
      {{ $t('btn.info.add') }}
    </a-button>
    <a-input-search
      v-model="searchValue"
      :allow-clear="true"
      :loading="loading"
      :placeholder="$t('text.info.search')"
      search-button
      style="width: 200px; margin-right: 10px"
      @change="onSearch"
      @clear="onSearch"
      @search="onSearch"
    />
  </a-row>
  <a-row mt>
    <a-watermark
      :content="[$t('common.text.watermark'), dayjs().format('YYYY-MM-DD')]"
      v-bind="watermark"
      w-full
    >
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
        <template #barCode="{ record }">
          {{ record.barCode || '—' }}
        </template>
        <template #operation="{ record }">
          <a-dropdown-button @click="onView(record)">
            {{ $t('common.btn.view') }}
            <template #icon>
              <icon-down />
            </template>
            <template #content>
              <a-doption @click="onEdit(record)">
                <template #icon>
                  <icon-pen />
                </template>
                <template #default>
                  {{ $t('common.btn.edit') }}
                </template>
              </a-doption>
              <a-doption @click="onDelete(record.id)">
                <template #icon>
                  <icon-delete />
                </template>
                <template #default>
                  {{ $t('common.btn.delete') }}
                </template>
              </a-doption>
            </template>
          </a-dropdown-button>
        </template>
      </a-table>
    </a-watermark>
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
          :max-length="{ length: 20, errorOnly: true }"
          :placeholder="$t('ph.info.productName')"
          allow-clear
          show-word-limit
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
        <a-input
          v-model="form.barCode"
          :max-length="{ length: 20, errorOnly: true }"
          :placeholder="$t('ph.info.barCode')"
          allow-clear
          show-word-limit
        />
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
          :max-length="{ length: 20, errorOnly: true }"
          :placeholder="$t('ph.info.productSpec')"
          allow-clear
          show-word-limit
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
    </a-form>
    <a-space flex justify-end>
      <a-button @click="cancelSave">
        {{ $t('common.text.cancel') }}
      </a-button>
      <a-button
        v-if="isAdd"
        :loading="loading"
        type="primary"
        @click="confirmAdd"
      >
        {{ $t('common.text.confirm') }}
      </a-button>
      <a-button v-else :loading="loading" type="primary" @click="confirmEdit">
        {{ $t('common.text.confirm') }}
      </a-button>
    </a-space>
  </a-modal>
  <a-modal
    v-model:visible="isView"
    :footer="false"
    :title="$t('title.info.view')"
    :width="450"
  >
    <a-descriptions :column="1" :data="viewData" />
  </a-modal>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import {
    addProductInfo,
    deleteProductInfo,
    getProductBrand,
    getProductCategory,
    getProductInfo,
    searchProductInfo,
    updateProductInfo,
  } from '@/api/product';
  import { useI18n } from 'vue-i18n';
  import { Message, Modal } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';

  const { loading, setLoading } = useLoading(false);
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
      slotName: 'barCode',
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
      title: t('title.operation'),
      slotName: 'operation',
      width: 100,
      align: 'center',
    },
  ];

  interface BrandList {
    id: number;
    brandName: string;
  }

  interface CategoryList {
    id: number;
    productAttribute: string;
    productType: string;
  }

  const brandList = ref([] as BrandList[]);
  const categoryList = ref([] as CategoryList[]);
  const isSave = ref(false);
  const isAdd = ref(false);
  const isView = ref(false);
  const data = ref();
  const viewData = ref();
  const operationId = ref();
  const formRef = ref();
  const searchValue = ref('');
  const form = ref({
    brandId: '',
    categoryId: '',
    productName: '',
    barCode: '',
    productSpec: '',
    productUnit: '',
  });
  const watermark = reactive({
    gap: [188, 188],
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

  const onEdit = (record: any) => {
    operationId.value = record.id;
    isSave.value = true;
    isAdd.value = false;
    form.value = {
      brandId: record.brandId,
      categoryId: record.categoryId,
      productName: record.productName,
      barCode: record.barCode,
      productSpec: record.productSpec,
      productUnit: record.productUnit,
    };
  };

  const cancelSave = () => {
    isSave.value = false;
    isAdd.value = false;
    formRef.value.resetFields();
  };

  const onSearch = () => {
    searchProductInfo(searchValue.value).then((res) => {
      data.value = res.data;
    });
  };

  const onView = (record: any) => {
    isView.value = true;
    viewData.value = [
      {
        label: t('title.info.brandId'),
        value: brandList.value.find(
          (item: { id: any }) => item.id === record.brandId
        )?.brandName,
      },
      {
        label: t('title.info.categoryId'),
        value: `${
          categoryList.value.find((item) => item.id === record.categoryId)
            ?.productAttribute
        }/${
          categoryList.value.find((item) => item.id === record.categoryId)
            ?.productType
        }`,
      },
      {
        label: t('title.info.productName'),
        value: record.productName,
      },
      {
        label: t('title.info.barCode'),
        value: record.barCode,
      },
      {
        label: t('title.info.productSpec'),
        value: record.productSpec,
      },
      {
        label: t('title.info.productUnit'),
        value: record.productUnit,
      },
      {
        label: t('common.title.userId'),
        value: record.userId,
      },
      {
        label: t('common.title.createTime'),
        value: record.createTime,
      },
      {
        label: t('common.title.updateTime'),
        value: record.updateTime,
      },
    ];
  };

  const onDelete = (id: number) => {
    Modal.error({
      title: t('common.title.delete'),
      content: t('common.content.delete'),
      hideCancel: false,
      okLoading: !loading,
      async onOk() {
        setLoading(true);
        deleteProductInfo(id)
          .then((res: any) => {
            if (res.code === 20000) {
              Message.success(t('common.message.delete.success'));
              getData();
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };

  const confirmAdd = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        setLoading(true);
        addProductInfo(form.value)
          .then((res: any) => {
            if (res.code === 20000) {
              getData();
              isSave.value = false;
              isAdd.value = false;
              formRef.value.resetFields();
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  const confirmEdit = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        setLoading(true);
        updateProductInfo({
          id: operationId.value,
          ...form.value,
        })
          .then((res: any) => {
            if (res.code === 20000) {
              getData();
              isSave.value = false;
              isAdd.value = false;
              formRef.value.resetFields();
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

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
