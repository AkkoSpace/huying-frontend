<template>
  <div h-full pt-4 px-4>
    <a-card h-full>
      <n-h2 prefix="bar" type="info">
        <a-typography-text>
          {{ $t('text.productPrice') }}
        </a-typography-text>
      </n-h2>
      <a-row flex justify-between>
        <a-button icon="plus" type="primary" @click="onAdd">
          {{ $t('btn.price.add') }}
        </a-button>
        <a-input-search
          v-model="searchValue"
          :allow-clear="true"
          :loading="loading"
          :placeholder="$t('text.price.search')"
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
              {{
                brandList.find((item) => item.id === record.brandId)?.brandName
              }}
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
            <template #priceLevel="{ record }">
              <a-tag v-if="record.priceLevel === 0" color="red">
                {{ $t('text.priceLevel.0') }}
              </a-tag>
              <a-tag v-else-if="record.priceLevel === 1" color="orange">
                {{ $t('text.priceLevel.1') }}
              </a-tag>
              <a-tag v-else-if="record.priceLevel === 2" color="green">
                {{ $t('text.priceLevel.2') }}
              </a-tag>
              <a-tag v-else-if="record.priceLevel === 3" color="blue">
                {{ $t('text.priceLevel.3') }}
              </a-tag>
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
        :title="
          isAdd ? $t('title.sellingPrice.add') : $t('title.sellingPrice.edit')
        "
        :width="850"
      >
        <a-form ref="formRef" :model="form" auto-label-width>
          <a-row w-full :gutter="12">
            <a-col :span="12">
              <a-form-item :label="$t('title.sellingPrice.productId')">
                <a-select v-model="form.productId" @change="onProductChange">
                  <a-option
                    v-for="item in productList"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.productName }}
                  </a-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('title.sellingPrice.brandId')">
                <a-select v-model="form.brandId" disabled>
                  <a-option
                    v-for="item in brandList"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.brandName }}
                  </a-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('title.sellingPrice.categoryId')">
                <a-select v-model="form.categoryId" disabled>
                  <a-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.productAttribute + '/' + item.productType }}
                  </a-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('title.sellingPrice.productName')">
                <a-input v-model="form.productName" disabled />
              </a-form-item>
              <a-form-item :label="$t('title.sellingPrice.barCode')">
                <a-input v-model="form.barCode" disabled />
              </a-form-item>
              <a-form-item :label="$t('title.sellingPrice.productSpec')">
                <a-input v-model="form.productSpec" disabled />
              </a-form-item>
              <a-form-item :label="$t('title.sellingPrice.productUnit')">
                <a-select v-model="form.productUnit" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                :label="$t('title.sellingPrice.purchasePrice')"
                :rules="[
                  {
                    required: true,
                    message: $t('rules.sellingPrice.purchasePrice.required'),
                  },
                ]"
                :validate-trigger="['change', 'blur']"
                field="purchasePrice"
              >
                <a-input-number
                  v-model="form.purchasePrice"
                  :allow-clear="true"
                  :hide-button="true"
                  :min="0"
                  :placeholder="$t('ph.sellingPrice.purchasePrice')"
                  :precision="2"
                >
                  <template #prefix> ￥</template>
                </a-input-number>
              </a-form-item>
              <a-form-item
                :label="$t('title.sellingPrice.standardPrice')"
                :rules="[
                  {
                    required: true,
                    message: $t('rules.sellingPrice.standardPrice.required'),
                  },
                ]"
                :validate-trigger="['change', 'blur']"
                field="standardPrice"
              >
                <a-input-number
                  v-model="form.standardPrice"
                  :allow-clear="true"
                  :hide-button="true"
                  :min="0"
                  :placeholder="$t('ph.sellingPrice.standardPrice')"
                  :precision="2"
                >
                  <template #prefix> ￥</template>
                </a-input-number>
              </a-form-item>
              <a-form-item
                :label="$t('title.sellingPrice.sellingPrice')"
                :rules="[
                  {
                    required: true,
                    message: $t('rules.sellingPrice.sellingPrice.required'),
                  },
                ]"
                :validate-trigger="['change', 'blur']"
                field="sellingPrice"
              >
                <a-input-number
                  v-model="form.sellingPrice"
                  :allow-clear="true"
                  :hide-button="true"
                  :min="0"
                  :placeholder="$t('ph.sellingPrice.sellingPrice')"
                  :precision="2"
                >
                  <template #prefix> ￥</template>
                </a-input-number>
              </a-form-item>
              <a-form-item
                :label="$t('title.sellingPrice.productProfit')"
                :rules="[
                  {
                    required: true,
                    message: $t('rules.sellingPrice.productProfit.required'),
                  },
                ]"
                :validate-trigger="['change', 'blur']"
                field="productProfit"
              >
                <a-input-number
                  v-model="form.productProfit"
                  :allow-clear="true"
                  :hide-button="true"
                  :min="0"
                  :placeholder="$t('ph.sellingPrice.productProfit')"
                  :precision="2"
                >
                  <template #prefix> ￥</template>
                </a-input-number>
              </a-form-item>
              <a-form-item :label="$t('title.sellingPrice.priceLevel')">
                <a-radio-group v-model="form.priceLevel">
                  <a-radio :value="0">
                    {{ $t('text.priceLevel.0') }}
                  </a-radio>
                  <a-radio :value="1">
                    {{ $t('text.priceLevel.1') }}
                  </a-radio>
                  <a-radio :value="2">
                    {{ $t('text.priceLevel.2') }}
                  </a-radio>
                  <a-radio :value="3">
                    {{ $t('text.priceLevel.3') }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
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
          <a-button
            v-else
            :loading="loading"
            type="primary"
            @click="confirmEdit"
          >
            {{ $t('common.text.confirm') }}
          </a-button>
        </a-space>
      </a-modal>
      <a-modal
        v-model:visible="isView"
        :footer="false"
        :title="$t('title.sellingPrice.view')"
        :width="450"
      >
        <a-descriptions :column="1" :data="viewData" />
      </a-modal>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import {
    addProductInfo,
    deleteProductInfo,
    getProductBrand,
    getProductCategory,
    getProductInfo,
    getSellingPrice,
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
      title: t('title.sellingPrice.brandId'),
      slotName: 'brandId',
    },
    {
      title: t('title.sellingPrice.categoryId'),
      slotName: 'categoryId',
    },
    {
      title: t('title.sellingPrice.productName'),
      dataIndex: 'productName',
    },
    // {
    //   title: t('title.sellingPrice.barCode'),
    //   dataIndex: 'barCode',
    // },
    {
      title: t('title.sellingPrice.productSpec'),
      dataIndex: 'productSpec',
    },
    {
      title: t('title.sellingPrice.productUnit'),
      dataIndex: 'productUnit',
    },
    {
      title: t('title.sellingPrice.purchasePrice'),
      dataIndex: 'purchasePrice',
    },
    {
      title: t('title.sellingPrice.standardPrice'),
      dataIndex: 'standardPrice',
    },
    {
      title: t('title.sellingPrice.sellingPrice'),
      dataIndex: 'sellingPrice',
    },
    {
      title: t('title.sellingPrice.productProfit'),
      dataIndex: 'productProfit',
    },
    {
      title: t('title.sellingPrice.priceLevel'),
      slotName: 'priceLevel',
      align: 'center',
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

  const productList = ref([] as any);
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
    productId: '',
    brandId: '',
    categoryId: '',
    productName: '',
    barCode: '',
    productSpec: '',
    productUnit: '',
    purchasePrice: 0,
    standardPrice: 0,
    sellingPrice: 0,
    productProfit: 0,
    priceLevel: 1,
  });
  const watermark = reactive({
    gap: [188, 188],
  });

  function getData() {
    getSellingPrice().then((res) => {
      data.value = res.data;
    });
  }

  const onAdd = () => {
    isSave.value = true;
    isAdd.value = true;
  };

  const onEdit = (record: any) => {
    console.log(record);
    operationId.value = record.id;
    isSave.value = true;
    isAdd.value = false;
    form.value = {
      productId: record.productId,
      brandId: record.brandId,
      categoryId: record.categoryId,
      productName: record.productName,
      barCode: record.barCode,
      productSpec: record.productSpec,
      productUnit: record.productUnit,
      purchasePrice: record.purchasePrice,
      standardPrice: record.standardPrice,
      sellingPrice: record.sellingPrice,
      productProfit: record.productProfit,
      priceLevel: record.priceLevel,
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
    const priceLevelMap: any = {
      0: t('text.priceLevel.0'),
      1: t('text.priceLevel.1'),
      2: t('text.priceLevel.2'),
      3: t('text.priceLevel.3'),
    };

    isView.value = true;
    viewData.value = [
      {
        label: t('title.sellingPrice.brandId'),
        value: brandList.value.find(
          (item: { id: any }) => item.id === record.brandId
        )?.brandName,
      },
      {
        label: t('title.sellingPrice.categoryId'),
        value: `${
          categoryList.value.find((item) => item.id === record.categoryId)
            ?.productAttribute
        }/${
          categoryList.value.find((item) => item.id === record.categoryId)
            ?.productType
        }`,
      },
      {
        label: t('title.sellingPrice.productName'),
        value: record.productName,
      },
      {
        label: t('title.sellingPrice.barCode'),
        value: record.barCode || '—',
      },
      {
        label: t('title.sellingPrice.productSpec'),
        value: record.productSpec,
      },
      {
        label: t('title.sellingPrice.productUnit'),
        value: record.productUnit,
      },
      {
        label: t('title.sellingPrice.purchasePrice'),
        value: `￥ ${record.purchasePrice}`,
      },
      {
        label: t('title.sellingPrice.standardPrice'),
        value: `￥ ${record.standardPrice}`,
      },
      {
        label: t('title.sellingPrice.sellingPrice'),
        value: `￥ ${record.sellingPrice}`,
      },
      {
        label: t('title.sellingPrice.productProfit'),
        value: `￥ ${record.productProfit}`,
      },
      {
        label: t('title.sellingPrice.priceLevel'),
        value: priceLevelMap[record.priceLevel] || t('text.priceLevel.3'),
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

  const onProductChange = (value: any) => {
    const product = productList.value.find((item: any) => item.id === value);
    form.value = {
      ...form.value,
      productId: product?.id,
      brandId: product?.brandId,
      categoryId: product?.categoryId,
      productName: product?.productName,
      barCode: product?.barCode,
      productSpec: product?.productSpec,
      productUnit: product?.productUnit,
      purchasePrice: product?.purchasePrice,
      standardPrice: product?.standardPrice,
    };
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
    getProductInfo().then((res) => {
      productList.value = res.data;
    });
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

<script lang="ts">
  export default {
    name: 'ProductPrice', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>
