<template>
  <div h-full pt-4 px-4>
    <a-card h-full>
      <n-h2 prefix="bar" type="info">
        <a-typography-text>
          {{ $t('text.supplier.info') }}
        </a-typography-text>
      </n-h2>
      <a-row :gutter="[24, 12]">
        <a-col :span="6">
          <a-card flex h-xs items-center justify-center w-full @click="onAdd">
            <a-row>
              <a-typography-title :heading="5">
                {{ $t('text.supplier.add') }}
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
                {{ item.supplierName }}
              </a-typography-title>
            </a-row>
            <a-row justify-center>
              <a-typography-title :heading="6">
                {{ item.supplierAddress }}
              </a-typography-title>
            </a-row>
            <a-row justify-center mt>
              <span mr>
                <icon-edit @click="onEdit(item)" />
              </span>
              <a-popconfirm
                :content="$t('common.content.delete')"
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
    </a-card>
    <a-modal
      v-model:visible="isSave"
      :footer="false"
      :title="isAdd ? $t('title.supplier.add') : $t('title.supplier.edit')"
      :width="450"
    >
      <a-form ref="formRef" :model="form" auto-label-width>
        <a-form-item
          :label="$t('label.supplierName')"
          :rules="[
            {
              required: true,
              message: $t('rules.supplierName.require'),
            },
            { max: 10, message: $t('rules.supplierName.max') },
          ]"
          :validate-trigger="['change', 'blur']"
          field="supplierName"
        >
          <a-input
            v-model="form.supplierName"
            :placeholder="$t('ph.supplierName')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('label.supplierAddress')"
          :rules="[
            {
              required: true,
              message: $t('rules.supplierAddress.require'),
            },
            { max: 50, message: $t('rules.supplierAddress.max') },
          ]"
          :validate-trigger="['change', 'blur']"
          field="supplierAddress"
        >
          <a-input
            v-model="form.supplierAddress"
            :placeholder="$t('ph.supplierAddress')"
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
        <a-button v-else type="primary" :loading="loading" @click="confirmEdit">
          {{ $t('common.text.confirm') }}
        </a-button>
      </a-space>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import {
    addSupplier,
    deleteSupplier,
    getSupplier,
    updateSupplier,
  } from '@/api/supplier';
  import useLoading from '@/hooks/loading';

  const { t } = useI18n();
  const { loading, setLoading } = useLoading(false);

  const data = ref();
  const isSave = ref(false);
  const isAdd = ref(false);
  const operationId = ref();
  const formRef = ref();
  const form = ref({
    supplierName: '',
    supplierAddress: '',
  });

  const onAdd = () => {
    isSave.value = true;
    isAdd.value = true;
  };

  const onEdit = (item: any) => {
    operationId.value = item.id;
    form.value = {
      supplierName: item.supplierName,
      supplierAddress: item.supplierAddress,
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
    getSupplier().then((res: any) => {
      data.value = res.data;
    });
  }

  const confirmAdd = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        setLoading(true);
        await addSupplier(form.value)
          .then((res: any) => {
            if (res.code === 20000) {
              getData();
              isSave.value = false;
              isAdd.value = false;
              formRef.value.resetFields();
            }
          })
          .finally(() => setLoading(false));
      }
    });
  };

  const confirmEdit = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        setLoading(true);
        await updateSupplier({
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
      }
    });
  };

  const confirmDelete = (id: number) => {
    setLoading(true);
    deleteSupplier(id)
      .then((res: any) => {
        if (res.code === 20000) {
          Message.success(t('common.message.delete.success'));
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
    name: 'SupplierInfo', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>
