<template>
  <div h-full>
    <div h-full pt-5 px-4>
      <a-card h-full p-2>
        <a-row>
          <n-h4 align-text ml-4 prefix="bar" type="info">
            <n-text type="info">
              {{ $t('title') }}
            </n-text>
          </n-h4>
        </a-row>
        <a-row>
          <a-col :flex="1">
            <a-form
              :label-col-props="{ span: 6 }"
              :model="searchFormModel"
              :wrapper-col-props="{ span: 18 }"
              label-align="left"
            >
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-form-item
                    :label="$t('transactionId')"
                    field="transactionId"
                  >
                    <a-input
                      v-model="searchFormModel.transactionId"
                      :placeholder="$t('ph.transactionId')"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-col>
          <a-divider class="h-[84px]" direction="vertical" />
          <a-col :flex="'86px'" style="text-align: right">
            <a-space :size="18" direction="vertical">
              <a-button type="primary">
                <template #icon>
                  <icon-search />
                </template>
                {{ $t('btn.search') }}
              </a-button>
              <a-button>
                <template #icon>
                  <icon-refresh />
                </template>
                {{ $t('btn.reset') }}
              </a-button>
            </a-space>
          </a-col>
        </a-row>
        <a-divider />
        <a-row mb-4>
          <a-col :span="12">
            <a-space>
              <a-button disabled type="primary">
                <template #icon>
                  <icon-check-square />
                </template>
                {{ $t('btn.batchOperation') }}
              </a-button>
            </a-space>
          </a-col>
          <a-col :span="12" class="flex items-center justify-end">
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('btn.add') }}
            </a-button>
          </a-col>
        </a-row>
        <a-table
          :bordered="false"
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          @page-change="pageChange"
          @page-size-change="pageSizeChange"
        >
          <template #status="{ record }">
            <a-tag v-if="record.status == 0" color="orangered">
              <template #icon>
                <icon-exclamation-circle-fill />
              </template>
              {{ t('orderStatus.0') }}
            </a-tag>
            <a-tag v-if="record.status == 1" color="green">
              <template #icon>
                <icon-check-circle-fill />
              </template>
              {{ t('orderStatus.1') }}
            </a-tag>
            <a-tag v-if="record.status == 2" color="gray">
              <template #icon>
                <icon-close-circle-fill />
              </template>
              {{ t('orderStatus.2') }}
            </a-tag>
            <a-tag v-if="record.status == 3" color="purple">
              <template #icon>
                <icon-minus-circle-fill />
              </template>
              {{ t('orderStatus.3') }}
            </a-tag>
          </template>
          <template #action="{ record }">
            <div flex flex-row justify-center>
              <a-button size="mini" type="text" @click="onView(record.id)">
                <template #icon>
                  <BrowseIcon mt-1 size="18px" />
                </template>
                <template #default>
                  {{ t('btn.action.view') }}
                </template>
              </a-button>

              <a-popconfirm
                :content="t('ph.confirmDelete')"
                type="error"
                @ok="onDelete(record.id)"
              >
                <a-button size="mini" type="text">
                  <template #icon>
                    <Delete1Icon mt-1 size="18px" />
                  </template>
                  <template #default>
                    {{ t('btn.action.delete') }}
                  </template>
                </a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { forEach } from 'lodash';
  import {
    addTransaction,
    AddTransactionData,
    getTransaction,
    listTransaction,
    ListTransactionData,
    deleteTransaction,
    DeleteTransactionData,
  } from '@/api/transaction/order';

  const { loading, setLoading } = useLoading(false);

  const { t } = useI18n();
  const pagination = reactive({
    showTotal: true,
    showPageSize: true,
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const initSearchFormModel = () => {
    return {
      transactionId: '',
    };
  };
  const searchFormModel = ref(initSearchFormModel());
  const columns = [
    {
      title: t('transactionId'),
      dataIndex: 'transactionId',
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      slotName: 'amount',
    },
    {
      title: t('transactionDate'),
      dataIndex: 'transactionDate',
      align: 'center',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      slotName: 'status',
      align: 'center',
    },
    {
      title: t('table.action'),
      slotName: 'action',
      align: 'center',
    },
  ];
  const data = ref([{}]);
  const doListTransaction = () => {
    const listTransactionData: ListTransactionData = {
      current: pagination.current,
      pageSize: pagination.pageSize,
    };
    setLoading(true);
    listTransaction(listTransactionData).then((res: any) => {
      try {
        if (res.code === 20000) {
          data.value.splice(0, data.value.length, ...res.data.records);
          pagination.total = Number(res.data.total);
        }
      } catch (error) {
        Message.error(t('msg.list.error'));
      } finally {
        setLoading(false);
        // 将data中的amount转换成人民币
        forEach(data, (item: any) => {
          item.amount = item.amount.toLocaleString('zh-CN', {
            style: 'currency',
            currency: 'CNY',
          });
        });
      }
    });
  };

  onMounted(() => {
    doListTransaction();
  });
</script>

<script lang="ts">
  export default {
    name: 'TransactionOrder', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
  :deep(.arco-card-body) {
    height: 100%;
  }
</style>
