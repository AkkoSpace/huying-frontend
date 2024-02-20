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
          isAdd ? $t('title.supplierPrice.add') : $t('title.supplierPrice.edit')
        "
        :width="450"
      >
        <a-form ref="formRef" :model="form" auto-label-width>
          <a-form-item
            :label="$t('title.supplierPrice.productId')"
            :rules="[
              {
                required: true,
                message: $t('rules.supplierPrice.productId.required'),
              },
            ]"
          >
            <a-select
              v-model="form.productId"
              @change="onProductChange"
              :placeholder="$t('ph.supplierPrice.selectProduct')"
            >
              <a-option
                v-for="item in productList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.productName }}
              </a-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('title.supplierPrice.brandId')">
            <a-select
              v-model="form.brandId"
              disabled
              :placeholder="$t('ph.supplierPrice.selectProduct')"
            >
              <a-option
                v-for="item in brandList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.brandName }}
              </a-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('title.supplierPrice.categoryId')">
            <a-select
              v-model="form.categoryId"
              disabled
              :placeholder="$t('ph.supplierPrice.selectProduct')"
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
          <a-form-item :label="$t('title.supplierPrice.productName')">
            <a-input
              v-model="form.productName"
              disabled
              :placeholder="$t('ph.supplierPrice.selectProduct')"
            />
          </a-form-item>
          <a-form-item :label="$t('title.supplierPrice.barCode')">
            <a-input
              v-model="form.barCode"
              disabled
              :placeholder="$t('ph.supplierPrice.selectProduct')"
            />
          </a-form-item>
          <a-form-item :label="$t('title.supplierPrice.productSpec')">
            <a-input
              v-model="form.productSpec"
              disabled
              :placeholder="$t('ph.supplierPrice.selectProduct')"
            />
          </a-form-item>
          <a-form-item :label="$t('title.supplierPrice.productUnit')">
            <a-select
              v-model="form.productUnit"
              disabled
              :placeholder="$t('ph.supplierPrice.selectProduct')"
            />
          </a-form-item>
          <a-form-item
            :label="$t('title.supplierPrice.supplierId')"
            :rules="[
              {
                required: true,
                message: $t('rules.supplierPrice.supplierId.required'),
              },
            ]"
            :validate-trigger="['change', 'blur']"
            field="supplier"
          >
            <a-select
              v-model="form.supplierId"
              :allow-clear="true"
              :placeholder="$t('ph.supplierPrice.supplierId')"
            >
              <!--                  <a-option v-for="item in supplierList" :key="item.id">-->
              <!--                    {{ item.supplierName }}-->
              <!--                  </a-option>-->
              <template #empty>
                <a-empty>
                  <template #image>
                    <icon-exclamation-circle-fill />
                  </template>
                  {{ $t('text.noData') }}
                </a-empty>
              </template>
            </a-select>
          </a-form-item>
          <a-form-item
            :label="$t('title.supplierPrice.purchasePrice')"
            :rules="[
              {
                required: true,
                message: $t('rules.supplierPrice.purchasePrice.required'),
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
              :placeholder="$t('ph.supplierPrice.purchasePrice')"
              :precision="2"
              disabled
            >
              <template #prefix> ￥</template>
            </a-input-number>
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
        :title="$t('title.supplierPrice.view')"
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
    getProductBrand,
    getProductCategory,
    getProductInfo,
    searchProductInfo,
  } from '@/api/product';
  import {
    addSupplierPrice,
    deleteSupplierPrice,
    getSupplierPrice,
    updateSupplierPrice,
  } from '@/api/supplier';
  import { useI18n } from 'vue-i18n';
  import { Message, Modal } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';

  const { loading, setLoading } = useLoading(false);
  const { t } = useI18n();
  const columns = [
    {
      title: t('title.supplierPrice.brandId'),
      slotName: 'brandId',
    },
    {
      title: t('title.supplierPrice.categoryId'),
      slotName: 'categoryId',
    },
    {
      title: t('title.supplierPrice.productName'),
      dataIndex: 'productName',
    },
    {
      title: t('title.supplierPrice.productSpec'),
      dataIndex: 'productSpec',
    },
    {
      title: t('title.supplierPrice.productUnit'),
      dataIndex: 'productUnit',
    },
    {
      title: t('title.supplierPrice.purchasePrice'),
      dataIndex: 'purchasePrice',
    },
    {
      title: t('title.supplierPrice.standardPrice'),
      dataIndex: 'standardPrice',
    },
    {
      title: t('title.supplierPrice.supplierPrice'),
      dataIndex: 'supplierPrice',
    },
    {
      title: t('title.supplierPrice.productProfit'),
      dataIndex: 'productProfit',
    },
    {
      title: t('title.supplierPrice.priceLevel'),
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
    supplierId: '',
    purchasePrice: 0,
    standardPrice: 0,
    supplierPrice: 0,
    productProfit: 0,
    priceLevel: 1,
  });
  const watermark = reactive({
    gap: [188, 188],
  });

  const calcProfit = () => {
    form.value.productProfit =
      form.value.supplierPrice - form.value.purchasePrice;
  };

  function getData() {
    getSupplierPrice().then((res) => {
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
      productId: record.productId,
      brandId: record.brandId,
      categoryId: record.categoryId,
      productName: record.productName,
      barCode: record.barCode,
      productSpec: record.productSpec,
      productUnit: record.productUnit,
      supplierId: record.supplierId,
      purchasePrice: record.purchasePrice,
      standardPrice: record.standardPrice,
      supplierPrice: record.supplierPrice,
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
        label: t('title.supplierPrice.brandId'),
        value: brandList.value.find(
          (item: { id: any }) => item.id === record.brandId
        )?.brandName,
      },
      {
        label: t('title.supplierPrice.categoryId'),
        value: `${
          categoryList.value.find((item) => item.id === record.categoryId)
            ?.productAttribute
        }/${
          categoryList.value.find((item) => item.id === record.categoryId)
            ?.productType
        }`,
      },
      {
        label: t('title.supplierPrice.productName'),
        value: record.productName,
      },
      {
        label: t('title.supplierPrice.barCode'),
        value: record.barCode || '—',
      },
      {
        label: t('title.supplierPrice.productSpec'),
        value: record.productSpec,
      },
      {
        label: t('title.supplierPrice.productUnit'),
        value: record.productUnit,
      },
      {
        label: t('title.supplierPrice.supplierId'),
        value: record.supplierId,
      },
      {
        label: t('title.supplierPrice.purchasePrice'),
        value: `￥ ${record.purchasePrice}`,
      },
      {
        label: t('title.supplierPrice.standardPrice'),
        value: `￥ ${record.standardPrice}`,
      },
      {
        label: t('title.supplierPrice.supplierPrice'),
        value: `￥ ${record.supplierPrice}`,
      },
      {
        label: t('title.supplierPrice.productProfit'),
        value: `￥ ${record.productProfit}`,
      },
      {
        label: t('title.supplierPrice.priceLevel'),
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
        deleteSupplierPrice(id)
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
      purchasePrice: 0,
      standardPrice: 0,
      supplierPrice: 0,
      priceLevel: 1,
    };
    calcProfit();
  };

  const confirmAdd = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        setLoading(true);
        addSupplierPrice({
          productId: form.value.productId,
          purchasePrice: form.value.purchasePrice,
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

  const confirmEdit = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        setLoading(true);
        updateSupplierPrice({
          id: operationId.value,
          productId: form.value.productId,
          purchasePrice: form.value.purchasePrice,
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
    name: 'SupplierPrice', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>
