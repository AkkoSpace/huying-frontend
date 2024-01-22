<template>
  <a-row :gutter="[24, 12]">
    <a-col :span="6">
      <a-card flex h-xs items-center justify-center w-full @click="onAdd">
        <a-row>
          <a-typography-title :heading="6">
            {{ $t('text.brand.add') }}
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
          <a-typography-title :heading="6">
            {{ item.brandName }}
          </a-typography-title>
        </a-row>
        <a-row justify-center mt>
          <span mr>
            <icon-edit @click="onEdit(item.id, item.brandName)" />
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
      </a-card>
    </a-col>
  </a-row>
  <a-modal
    v-model:visible="isSave"
    :footer="false"
    :title="isAdd ? $t('title.brand.add') : $t('title.brand.edit')"
    :width="350"
  >
    <a-form ref="formRef" :model="form" auto-label-width>
      <a-form-item
        :label="$t('title.brand.brandName')"
        :rules="[
          {
            required: true,
            message: $t('rules.brand.brandName.required'),
          },
          { max: 10, message: $t('rules.brand.brandName.max') },
        ]"
        :validate-trigger="['change', 'blur']"
        field="brandName"
      >
        <a-input
          v-model="form.brandName"
          :placeholder="$t('ph.brand.brandName')"
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
  import useLoading from '@/hooks/loading';

  const { t } = useI18n();

  const data = ref();
  const isSave = ref(false);
  const isAdd = ref(false);
  const operationId = ref();
  const formRef = ref();
  const form = ref({
    brandName: '',
  });

  const { loading, setLoading } = useLoading(false);

  const onAdd = () => {
    isSave.value = true;
    isAdd.value = true;
  };

  const onEdit = (id: any, brandName: string) => {
    operationId.value = id;
    form.value.brandName = brandName;
    isSave.value = true;
    isAdd.value = false;
  };

  const cancelSave = () => {
    isSave.value = false;
    isAdd.value = false;
    formRef.value.resetFields();
  };

  function getData() {
    getProductBrand().then((res) => {
      data.value = res.data;
    });
  }

  const confirmAdd = () => {
    formRef.value.validate(async (vaild: any) => {
      if (!vaild) {
        setLoading(true);
        await addProductBrand(form.value)
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
        await updateProductBrand({
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

  const confirmDelete = (id: number) => {
    setLoading(true);
    deleteProductBrand(id)
      .then((res: any) => {
        if (res.code === 20000) {
          Message.success(t('common.message.delete.success'));
          getData();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  onMounted(() => {
    getData();
  });
</script>
