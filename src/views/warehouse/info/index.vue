<template>
  <div h-full pt-4 px-4>
    <a-card h-full>
      <n-h3 prefix="bar" type="info">
        <a-typography-text>
          {{ $t('text.warehouse.info') }}
        </a-typography-text>
      </n-h3>
      <a-row :gutter="[24, 12]">
        <a-col :span="6">
          <a-card flex h-xs items-center justify-center w-full @click="onAdd">
            <a-row>
              <a-typography-text>
                {{ $t('text.warehouse.add') }}
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
                {{ item.warehouseName }}
              </a-typography-title>
            </a-row>
            <a-row justify-center>
              <a-typography-title :heading="6">
                {{ item.warehouseAddress }}
              </a-typography-title>
            </a-row>
            <a-row justify-center mt>
              <span mr>
                <icon-edit @click="onEdit(item.id, item.warehouseName)" />
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
            <a-row justify-center mt w-full>
              <a-switch />
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-modal
      v-model:visible="isSave"
      :footer="false"
      :title="isAdd ? $t('title.warehouse.add') : $t('title.warehouse.edit')"
      :width="350"
    >
      <a-form ref="formRef" :model="form" auto-label-width>
        <a-form-item
          :label="$t('label.warehouseName')"
          :rules="[
            {
              required: true,
              message: $t('rules.warehouseName'),
            },
            { max: 10, message: $t('rules.warehouseName.max') },
          ]"
          :validate-trigger="['change', 'blur']"
          field="warehouseName"
        >
          <a-input
            v-model="form.warehouseName"
            :placeholder="$t('ph.warehouseName')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('label.warehouseAddress')"
          :rules="[
            {
              required: true,
              message: $t('rules.warehouseAddress'),
            },
            { max: 50, message: $t('rules.warehouseAddress.max') },
          ]"
          :validate-trigger="['change', 'blur']"
          field="warehouseAddress"
        >
          <a-input
            v-model="form.warehouseAddress"
            :placeholder="$t('ph.warehouseAddress')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('label.warehouseStatus')"
          :rules="[
            {
              required: true,
              message: $t('rules.warehouseStatus'),
            },
          ]"
          :validate-trigger="['change', 'blur']"
          field="warehouseStatus"
        >
          <a-switch
            v-model="form.warehouseStatus"
            :checked-value="1"
            :unchecked-value="0"
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
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import {
    addWarehouse,
    deleteWarehouse,
    getWarehouse,
    updateWarehouse,
  } from '@/api/warehouse';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const data = ref();
  const isSave = ref(false);
  const isAdd = ref(false);
  const operationId = ref();
  const formRef = ref();
  const form = ref({
    warehouseName: '',
    warehouseAddress: '',
    warehouseStatus: false,
  });

  function getData() {
    getWarehouse().then((res: any) => {
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
    deleteWarehouse(id).then((res: any) => {
      if (res.code === 20000) {
        Message.success(t('message.delete.success'));
        getData();
      }
    });
  };

  const onEdit = (id: any, brandName: string) => {
    operationId.value = id;
    // form.value.brandName = brandName;
    isSave.value = true;
    isAdd.value = false;
  };

  const confirmAdd = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        await addWarehouse(form.value).then((res: any) => {
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
        await updateWarehouse({
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

<script lang="ts">
  export default {
    name: 'WarehouseInfo', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>
