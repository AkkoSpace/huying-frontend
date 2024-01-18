<template>
  <div h-full pt-4 px-4>
    <a-card h-full>
      <n-h2 prefix="bar" type="info">
        <a-typography-text>
          {{ $t('text.warehouse.info') }}
        </a-typography-text>
      </n-h2>
      <a-row :gutter="[24, 12]">
        <a-col :span="6">
          <a-card flex h-xs items-center justify-center w-full @click="onAdd">
            <a-row>
              <a-typography-title :heading="5">
                {{ $t('text.warehouse.add') }}
              </a-typography-title>
            </a-row>
            <a-row justify-center mt>
              <icon-plus />
            </a-row>
          </a-card>
        </a-col>
        <a-col v-for="item in data" :key="item.id" :span="6">
          <a-card flex h-xs items-center justify-center w-full>
            <a-row justify-center>
              <a-typography-title :heading="5">
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
                <icon-edit @click="onEdit(item)" />
              </span>
              <a-popconfirm
                :content="$t('common.content.delete')"
                :ok-loading="loading"
                position="bottom"
                type="warning"
                @ok="confirmDelete(item.id)"
              >
                <span> <icon-delete /> </span>
              </a-popconfirm>
            </a-row>
            <a-row justify-center mt w-full>
              <a-switch
                v-model="item.warehouseStatus"
                :checked-value="1"
                :loading="loading"
                :unchecked-value="0"
                @change="changeStatus(item)"
              />
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
  import useLoading from '@/hooks/loading';

  const { t } = useI18n();
  const { loading, setLoading } = useLoading(false);

  const data = ref();
  const isSave = ref(false);
  const isAdd = ref(false);
  const operationId = ref();
  const formRef = ref();
  const form = ref({
    warehouseName: '',
    warehouseAddress: '',
    warehouseStatus: 1,
  });

  const onAdd = () => {
    isSave.value = true;
    isAdd.value = true;
  };

  const onEdit = (item: any) => {
    operationId.value = item.id;
    form.value = {
      warehouseName: item.warehouseName,
      warehouseAddress: item.warehouseAddress,
      warehouseStatus: item.warehouseStatus,
    };
    isSave.value = true;
    isAdd.value = false;
  };

  const cancelSave = () => {
    isSave.value = false;
    isAdd.value = false;
    formRef.value.resetFields();
  };

  function getData() {
    getWarehouse().then((res: any) => {
      data.value = res.data;
    });
  }

  const confirmAdd = () => {
    setLoading(true);
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        await addWarehouse(form.value)
          .then((res: any) => {
            if (res.code === 20000) {
              getData();
              isSave.value = false;
              isAdd.value = false;
              formRef.value.resetFields();
              Message.success(t('common.message.add.success'));
            }
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  };

  const confirmEdit = () => {
    setLoading(true);
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        await updateWarehouse({
          id: operationId.value,
          ...form.value,
        })
          .then((res: any) => {
            if (res.code === 20000) {
              getData();
              isSave.value = false;
              isAdd.value = false;
              formRef.value.resetFields();
              Message.success(t('common.message.edit.success'));
            }
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  };

  const confirmDelete = (id: number) => {
    setLoading(true);
    deleteWarehouse(id)
      .then((res: any) => {
        if (res.code === 20000) {
          Message.success(t('message.delete.success'));
          getData();
        }
      })
      .finally(() => setLoading(false));
  };

  const changeStatus = (item: any) => {
    setLoading(true);
    updateWarehouse({
      id: item.id,
      warehouseName: item.warehouseName,
      warehouseAddress: item.warehouseAddress,
      warehouseStatus: item.warehouseStatus,
    })
      .then((res: any) => {
        if (res.code === 20000) {
          Message.success(t('common.message.switch.success'));
          getData();
        }
      })
      .finally(() => setLoading(false));
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
