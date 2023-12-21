<template>
  <div class="card-custom" flex flex-row h-full w-full>
    <div class="w-3/4">
      <div class="h-[150px]" pt-2 px-2>
        <a-card h-full> 333</a-card>
      </div>
      <div class="h-[calc(100vh_-_150px_-_100px)]" p-2>
        <a-card h-full overflow-auto>
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
            <template #pagination-left>
              <div flex flex-row justify-start w-full>
                <a-button shape="circle" type="text" @click="doListTransaction">
                  <icon-refresh />
                </a-button>
              </div>
            </template>
          </a-table>
        </a-card>
      </div>
    </div>
    <div class="w-1/4" pr-2 py-2>
      <a-card h-full overflow-auto>
        <div class="h-1/10" flex flex-row items-center justify-center>
          <div class="w-1/3" flex justify-center>
            <icon-font
              v-if="!isAdd && !isSearch"
              :size="32"
              type="icon-add"
              @click="onAdd"
            />
            <icon-font
              v-if="!isAdd && isSearch"
              :size="32"
              type="icon-add-grey"
            />
            <icon-font
              v-if="isAdd"
              :size="32"
              type="icon-close"
              @click="onClose"
            />
          </div>

          <div class="w-1/3" flex justify-center>
            <icon-font :size="32" type="icon-edit-grey" />
          </div>

          <div class="w-1/3" flex justify-center>
            <icon-font
              v-if="!isSearch && !isAdd"
              :size="32"
              type="icon-search"
              @click="onSearch"
            />
            <icon-font
              v-if="!isSearch && isAdd"
              :size="32"
              type="icon-search-grey"
            />
            <icon-font
              v-if="isSearch"
              :size="32"
              type="icon-close"
              @click="onClose"
            />
          </div>
        </div>
        <div class="h-9/10">
          <div flex flex-col h-full overflow-auto>
            <div flex flex-col h-full>
              <n-h4
                :type="pageStatus"
                align-text
                flex
                items-center
                justify-center
                ml-4
                prefix="bar"
              >
                <n-text :type="pageStatus">
                  {{ pageText }}
                </n-text>
              </n-h4>
              <div v-if="isAdd" flex h-8 justify-between w-full>
                <div>
                  <a-tooltip :content="t('tip.template')" mini position="top">
                    <icon-paste
                      color="blue-4"
                      size="18px"
                      @click="useTemplate"
                    />
                  </a-tooltip>
                  <a-tooltip :content="t('tip.clear')" mini position="top">
                    <icon-eraser color="red-4" ml-2 size="18px" />
                  </a-tooltip>
                </div>

                <div>
                  <a-checkbox v-model="clearAfterAdd">
                    {{ t('clearAfterAdd') }}
                  </a-checkbox>
                </div>
              </div>
              <a-form
                v-if="isAdd"
                ref="addFormRef"
                :model="addFormModel"
                :rules="addFormRules"
                layout="vertical"
              >
                <a-form-item
                  :label="t('transactionId')"
                  :validate-trigger="['change', 'blur']"
                  asterisk-position="end"
                  field="transactionId"
                >
                  <a-input
                    v-model="addFormModel.transactionId"
                    :placeholder="t('ph.transactionId')"
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
                  <a-input
                    v-model="addFormModel.amount"
                    :placeholder="t('ph.amount')"
                  >
                    <template #append> RMB</template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  :label="t('transactionDate')"
                  :style="{ width: '100%' }"
                  :validate-trigger="['change', 'blur']"
                  asterisk-position="end"
                  field="transactionDate"
                >
                  <a-date-picker v-model="addFormModel.transactionDate" />
                </a-form-item>
                <a-form-item
                  :label="t('status')"
                  :validate-trigger="['change', 'blur']"
                  asterisk-position="end"
                  field="status"
                >
                  <a-select
                    v-model="addFormModel.status"
                    :placeholder="t('ph.status')"
                  >
                    <a-option
                      v-for="item in orderStatus"
                      :key="item"
                      :value="item"
                    >
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
                    v-model="addFormModel.description"
                    :placeholder="t('ph.description')"
                  />
                </a-form-item>
                <a-form-item>
                  <a-popconfirm
                    :content="t('ph.confirmReset')"
                    type="warning"
                    @ok="confirmReset"
                  >
                    <a-button
                      class="w-1/2 mr"
                      long
                      shape="round"
                      type="secondary"
                    >
                      {{ t('btn.add.reset') }}
                    </a-button>
                  </a-popconfirm>
                  <a-button
                    class="w-1/2"
                    long
                    shape="round"
                    status="success"
                    type="primary"
                    @click="confirmAdd"
                  >
                    {{ t('btn.add.ok') }}
                  </a-button>
                </a-form-item>
              </a-form>

              <a-form v-if="isSearch" layout="vertical">
                <a-form-item :label="t('transactionId')">
                  <a-input :placeholder="t('ph.transactionId')" />
                </a-form-item>
                <a-form-item :label="t('amount')">
                  <a-input :placeholder="t('ph.amount')" />
                </a-form-item>
                <a-form-item :label="t('transactionDate')">
                  <a-range-picker />
                </a-form-item>
                <a-form-item :label="t('status')">
                  <a-select :placeholder="t('ph.status')">
                    <a-option
                      v-for="item in orderStatus"
                      :key="item"
                      :value="item"
                    >
                      {{ item.label }}
                    </a-option>
                  </a-select>
                </a-form-item>
                <a-form-item :label="t('description')">
                  <a-input :placeholder="t('ph.description')" />
                </a-form-item>
                <a-form-item>
                  <a-button
                    class="w-1/2 mr"
                    long
                    shape="round"
                    type="secondary"
                  >
                    {{ t('btn.search.reset') }}
                  </a-button>
                  <a-button
                    class="w-1/2"
                    long
                    shape="round"
                    type="primary"
                    @click="doListTransaction"
                  >
                    {{ t('btn.search.ok') }}
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </a-card>
    </div>
    <a-modal
      v-model:visible="isView"
      :hide-cancel="true"
      :width="400"
      @ok="handleOk"
    >
      <template #title>
        {{ t('text.view') }}
      </template>
      <div>
        <n-h5
          type="success"
          align-text
          flex
          items-center
          justify-center
          ml-4
          prefix="bar"
        >
          <n-text type="success">
            {{ t('text.basic') }}
          </n-text>
        </n-h5>
        <a-descriptions :column="1" :data="detailDataBasic" size="large" />
      </div>
      <div>
        <n-h5
          type="success"
          align-text
          flex
          items-center
          justify-center
          ml-4
          prefix="bar"
        >
          <n-text type="success">
            {{ t('text.advanced') }}
          </n-text>
        </n-h5>
        <a-descriptions :column="1" :data="detailDataAdvanced" size="large" />
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { Icon, Message } from '@arco-design/web-vue';
  import { BrowseIcon, Delete1Icon } from 'tdesign-icons-vue-next';
  import {
    addTransaction,
    AddTransactionData,
    getTransaction,
    listTransaction,
    ListTransactionData,
    deleteTransaction,
    DeleteTransactionData,
  } from '@/api/transaction';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import { forEach } from 'lodash';

  const { loading, setLoading } = useLoading(false);

  const { t } = useI18n();
  const IconFont = Icon.addFromIconFontCn({
    src: 'https://at.alicdn.com/t/c/font_4376084_e6y7bg9dho.js',
  });
  const pagination = reactive({
    showTotal: true,
    showPageSize: true,
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const addFormModel = reactive({
    transactionId: '',
    amount: '',
    transactionDate: '',
    status: {
      label: '',
      value: '0',
    },
    description: '',
  });
  const addFormRules = reactive({
    transactionId: [
      {
        required: true,
        message: t('ph.transactionId'),
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
  const data = reactive([{}]);
  const isAdd = ref(false);
  const isSearch = ref(false);
  const isView = ref(false);
  const clearAfterAdd = ref(false);
  const pageStatus = ref('success');
  const pageText = ref(t('text.default'));
  let detailDataBasic = [];
  let detailDataAdvanced = [];

  function doListTransaction() {
    const listTransactionData: ListTransactionData = {
      current: pagination.current,
      pageSize: pagination.pageSize,
    };
    setLoading(true);
    listTransaction(listTransactionData).then((res: any) => {
      try {
        if (res.code === 20000) {
          data.splice(0, data.length, ...res.data.records);
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
  }

  function useTemplate() {
    const date = new Date();
    addFormModel.transactionId = date
      .toLocaleDateString()
      .split('/')
      .join('')
      .slice(2);
    addFormModel.transactionDate = date
      .toLocaleDateString()
      .split('/')
      .join('-');
  }

  function onSearch() {
    isAdd.value = false;
    isSearch.value = true;
    pageStatus.value = isSearch.value ? 'info' : 'success';
    pageText.value = isSearch.value ? t('text.search') : t('text.default');
  }

  function onAdd() {
    isSearch.value = false;
    isAdd.value = true;
    pageStatus.value = 'success';
    pageText.value = isAdd.value ? t('text.add') : t('text.default');
  }

  async function onView(id: string) {
    await getTransaction(id).then((res: any) => {
      try {
        if (res.code === 20000) {
          detailDataBasic = [
            {
              label: t('transactionId'),
              value: res.data.transactionId,
            },
            {
              label: t('amount'),
              value: res.data.amount.toLocaleString('zh-CN', {
                style: 'currency',
                currency: 'CNY',
              }),
            },
            {
              label: t('transactionDate'),
              value: res.data.transactionDate,
            },
            {
              label: t('status'),
              value: res.data.status,
            },
            {
              label: t('description'),
              value: res.data.description,
            },
          ];
          detailDataAdvanced = [
            {
              label: t('createTime'),
              value: res.data.createTime,
            },
            {
              label: t('updateTime'),
              value: res.data.updateTime,
            },
          ];
        }
      } catch (error) {
        Message.error(t('msg.get.error'));
      }
    });
    isView.value = true;
  }
  function onDelete(id: string) {
    deleteTransaction(id).then((res: any) => {
      try {
        if (res.code === 20000) {
          Message.success(t('msg.delete.success'));
          doListTransaction();
        }
      } catch (error) {
        Message.error(t('msg.delete.error'));
      }
    });
  }

  function handleOk() {
    isView.value = false;
  }

  const addFormRef = ref();
  const onClose = () => {
    isAdd.value = false;
    isSearch.value = false;
    pageStatus.value = 'success';
    pageText.value = t('text.default');
    addFormRef.value.resetFields();
  };

  function confirmReset() {
    addFormRef.value.resetFields();
  }

  function pageChange(page: number) {
    pagination.current = page;
    doListTransaction();
  }

  function pageSizeChange(pageSize: number) {
    pagination.pageSize = pageSize;
    doListTransaction();
  }

  const userStore = useUserStore();

  function doAddTransaction() {
    const addTransactionData: AddTransactionData = {
      userId: userStore.id,
      transactionId: `XD${addFormModel.transactionId}`,
      amount: Number(addFormModel.amount),
      transactionDate: addFormModel.transactionDate,
      status: Number(addFormModel.status.value),
      description: addFormModel.description,
    };
    setLoading(true);
    addTransaction(addTransactionData).then((res: any) => {
      try {
        if (res.code === 20000) {
          Message.success(t('msg.add.success'));
          if (clearAfterAdd.value) addFormRef.value.resetFields();
          doListTransaction();
        }
      } catch (error) {
        Message.error(t('msg.add.error'));
      } finally {
        setLoading(false);
      }
    });
  }

  function confirmAdd() {
    // eslint-disable-next-line consistent-return
    addFormRef.value.validate((valid: any) => {
      if (!valid) {
        doAddTransaction();
      } else {
        Message.error(t('msg.add.validate'));
        return false;
      }
    });
  }

  onMounted(() => {
    doListTransaction();
  });
</script>

<style scoped>
  .card-custom {
    :deep(.arco-card-body) {
      @apply h-full;
    }
  }
</style>
