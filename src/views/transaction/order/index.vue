<template>
  <div h-full>
    <div h-full pt-5 px-4>
      <a-card h-full p-2>
        <a-row>
          <n-h4 align-text prefix="bar" type="info">
            <n-text type="info">
              {{ $t('title.page') }}
            </n-text>
          </n-h4>
        </a-row>
        <a-row>
          <a-col :flex="1">
            <a-form
              :label-col-props="{ span: 8 }"
              :model="searchFormModel"
              :wrapper-col-props="{ span: 16 }"
              label-align="left"
            >
              <a-row>
                <a-col :span="8">
                  <a-form-item
                    :label="$t('transactionOrder')"
                    field="transactionOrder"
                  >
                    <a-input
                      v-model="searchFormModel.transactionOrder"
                      :placeholder="$t('ph.transactionOrder')"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-col>
          <a-divider direction="vertical" h-10 />
          <a-col :flex="'40px'" style="text-align: right">
            <a-space :size="18">
              <a-button type="primary" @click="doListTransaction">
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
            <a-button type="primary" @click="onAdd">
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
  <a-modal v-model:visible="saveVisible" :closable="false" :footer="false">
    <div>
      <a-row flex>
        <div flex-1 justify-start>
          <n-h4 align-text ml-4 prefix="bar" type="success">
            <n-text v-if="saveType === 'add'" type="success">
              {{ $t('title.add') }}
            </n-text>
            <n-text v-else type="success">
              {{ $t('title.edit') }}
            </n-text>
          </n-h4>
        </div>
        <div justify-end>
          <a-radio-group v-model="radioValue" :options="radioOptions" />
        </div>
      </a-row>
      <a-form
        ref="saveFormRef"
        :model="saveFormModel"
        :rules="saveFormRules"
        asterisk-position="start"
      >
        <a-form-item
          :label="t('transactionOrder')"
          :validate-trigger="['change', 'blur']"
          asterisk-position="end"
          field="transactionOrder"
        >
          <a-input
            v-model="saveFormModel.transactionOrder"
            :placeholder="t('ph.transactionOrder')"
          >
            <template #prepend> XD</template>
          </a-input>
        </a-form-item>
        <a-form-item
          :label="t('amount')"
          :validate-trigger="['change', 'blur']"
          asterisk-position="end"
          field="amount"
        >
          <a-input v-model="saveFormModel.amount" :placeholder="t('ph.amount')">
            <template #append> RMB</template>
          </a-input>
        </a-form-item>
        <a-form-item
          :label="t('transactionDate')"
          :validate-trigger="['change', 'blur']"
          asterisk-position="end"
          field="transactionDate"
        >
          <a-date-picker
            v-model="saveFormModel.transactionDate"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item
          :label="t('status')"
          :validate-trigger="['change', 'blur']"
          asterisk-position="end"
          field="status"
        >
          <a-select
            v-model="saveFormModel.status"
            :placeholder="t('ph.status')"
          >
            <a-option v-for="item in orderStatus" :key="item" :value="item">
              {{ item.label }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :hide-asterisk="true"
          :label="t('description')"
          field="status"
          validate-trigger="blur"
        >
          <a-input
            v-model="saveFormModel.description"
            :placeholder="t('ph.description')"
          />
        </a-form-item>
      </a-form>
      <div flex justify-end>
        <a-button class="mr" type="secondary">
          {{ t('btn.cancel') }}
        </a-button>
        <a-button type="primary" @click="doListTransaction">
          {{ t('btn.ok') }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { forEach } from 'lodash';
  import {
    listTransaction,
    ListTransactionData,
  } from '@/api/transaction/order';

  const { loading, setLoading } = useLoading(false);
  const { t } = useI18n();
  const saveVisible = ref(false);
  const saveType = 'add';
  const radioValue = 'no';
  const radioOptions = [
    { label: t('text.no'), value: 'no' },
    { label: t('text.yes'), value: 'yes', disabled: true },
  ];

  const pagination = reactive({
    showTotal: true,
    showPageSize: true,
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const saveFormModel = reactive({
    transactionOrder: '',
    amount: '',
    transactionDate: '',
    status: {
      label: '',
      value: '0',
    },
    description: '',
  });
  const saveFormRules = reactive({
    transactionOrder: [
      {
        required: true,
        message: t('ph.transactionOrder'),
      },
    ],
    amount: [
      {
        required: true,
        message: t('ph.amount'),
      },
    ],
    transactionDate: [
      {
        required: true,
        message: t('ph.transactionDate'),
      },
    ],
    status: [
      {
        required: true,
        message: t('ph.status'),
      },
    ],
    // description: [
    //   {
    //     if: (value: string) => value.length > 20,
    //     message: t('ph.description'),
    //   },
    // ],
  });
  const orderStatus = [
    {
      label: t('orderStatus.0'),
      value: '0',
    },
    {
      label: t('orderStatus.1'),
      value: '1',
    },
    {
      label: t('orderStatus.2'),
      value: '2',
    },
    {
      label: t('orderStatus.3'),
      value: '3',
    },
  ];
  const initSearchFormModel = () => {
    return {
      transactionOrder: '',
    };
  };
  const searchFormModel = ref(initSearchFormModel());
  const columns = [
    {
      title: t('transactionOrder'),
      dataIndex: 'transactionOrder',
    },

    {
      title: t('transactionDate'),
      dataIndex: 'transactionDate',
      align: 'center',
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      slotName: 'amount',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      slotName: 'status',
      align: 'center',
    },
    {
      title: t('action'),
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
        if (data.value.length !== 0) {
          // 将data中的amount转换成人民币
          // convert the amount in data to RMB
          forEach(data, (item: any) => {
            item.amount = item.amount.toLocaleString('zh-CN', {
              style: 'currency',
              currency: 'CNY',
            });
          });
        }
      }
    });
  };

  const onAdd = () => {
    saveVisible.value = true;
  };

  const cancelSave = () => {
    saveVisible.value = false;
  };

  const confirmSave = () => {
    saveVisible.value = false;
  };

  function pageChange(page: number) {
    pagination.current = page;
    doListTransaction();
  }

  function pageSizeChange(pageSize: number) {
    pagination.pageSize = pageSize;
    doListTransaction();
  }

  onMounted(() => {
    doListTransaction();
  });
</script>

<script lang="ts">
  export default {
    // 如果想让 keep-alive 的 include 属性生效，必须给组件命名
    // If you want the include property of keep-alive to take effect, you must name the component
    name: 'TransactionOrder',
  };
</script>
