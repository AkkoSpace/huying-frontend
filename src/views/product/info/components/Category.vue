<template>
  <a-row flex justify-between>
    <a-button icon="plus" type="primary" @click="onAdd">
      {{ $t('btn.category.add') }}
    </a-button>
    <a-input-search
      v-model="searchValue"
      :allow-clear="true"
      :loading="loading"
      :placeholder="$t('text.category.search')"
      search-button
      style="width: 200px; margin-right: 10px"
      @change="onSearch"
      @clear="onSearch"
      @search="onSearch"
    />
  </a-row>
  <a-row mt>
    <a-table :bordered="false" :columns="columns" :data="data" w-full>
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
    :title="$t('title.category.view')"
    :width="450"
  >
    <a-descriptions :column="1" :data="viewData" />
  </a-modal>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import {
    addProductCategory,
    deleteProductCategory,
    getProductCategory,
    searchProductCategory,
    updateProductCategory,
  } from '@/api/product';
  import { useI18n } from 'vue-i18n';
  import { Message, Modal } from '@arco-design/web-vue';
  import useLoading from '@/hooks/loading';

  const { loading, setLoading } = useLoading(false);
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
      width: 100,
      align: 'center',
    },
  ];

  const isSave = ref(false);
  const isAdd = ref(false);
  const isView = ref(false);
  const data = ref();
  const viewData = ref();
  const operationId = ref();
  const formRef = ref();
  const searchValue = ref('');
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

  const onEdit = (record: any) => {
    operationId.value = record.id;
    isSave.value = true;
    isAdd.value = false;
    form.value = {
      productAttribute: record.productAttribute,
      productType: record.productType,
    };
  };

  const cancelSave = () => {
    isSave.value = false;
    isAdd.value = false;
    formRef.value.resetFields();
  };

  const onSearch = () => {
    searchProductCategory(searchValue.value).then((res) => {
      data.value = res.data;
    });
  };

  const onView = (record: any) => {
    isView.value = true;
    viewData.value = [
      {
        label: t('title.category.productAttribute'),
        value: record.productAttribute,
      },
      {
        label: t('title.category.productType'),
        value: record.productType,
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
        deleteProductCategory(id)
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
        addProductCategory(form.value)
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
        await updateProductCategory({
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

  onMounted(() => {
    getData();
  });
</script>
