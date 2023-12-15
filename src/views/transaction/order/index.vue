<template>
  <div h-full w-full>
    <div class="h-[180px] card-custom" flex flex-row pt-4 px-3>
      <div class="w-3/4">
        <a-card h-full> 333</a-card>
      </div>
      <div class="w-1/4" h-full pl-2>
        <a-card h-full>
          <div flex flex-row h-full items-center justify-center>
            <div class="w-1/3" flex justify-center>
              <icon-font :size="32" type="icon-a-024_tianjia" />
            </div>
            <div class="w-1/3" flex justify-center>
              <icon-font :size="32" type="icon-a-024_bianji-37" />
            </div>
            <div class="w-1/3" flex justify-center>
              <icon-font
                :size="32"
                type="icon-a-024_sousuo"
                @click="onSearch"
              />
            </div>
          </div>
        </a-card>
      </div>
    </div>
    <div class="h-[calc(100vh_-_280px)] card-custom" pt-4 px-3>
      <div flex flex-row h-full>
        <div class="w-3/4">
          <a-card h-full overflow-auto>
            <a-table :bordered="false" :columns="columns" :data="data" />
          </a-card>
        </div>
        <div class="w-1/4" pl-2>
          <div h-full>
            <a-card v-if="!isSearch" animate-flip-in-y h-full> 111</a-card>
            <a-card
              v-if="isSearch"
              animate-flip-in-y
              h-full
              flex
              flex-col
              overflow-auto
            >
              <a-form layout="vertical">
                <a-form-item :label="t('table.transactionId')">
                  <a-input :placeholder="t('table.transactionId.ph')" />
                </a-form-item>
                <a-form-item :label="t('table.amount')">
                  <a-input :placeholder="t('table.amount.ph')" />
                </a-form-item>
                <a-form-item :label="t('table.transactionDate')">
                  <a-range-picker />
                </a-form-item>
                <a-form-item :label="t('table.status')">
                  <a-select :placeholder="t('table.status.ph')">
                    <a-select-option
                      v-for="item in ['1', '2', '3']"
                      :key="item"
                      :value="item"
                    >
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item :label="t('table.description')">
                  <a-input :placeholder="t('table.description.ph')" />
                </a-form-item>
                <a-form-item>
                  <a-button type="secondary" shape="round" long class="w-1/2">
                    {{ t('btn.reset') }}
                  </a-button>
                  <a-button type="primary" shape="round" long class="w-1/2">
                    {{ t('btn.search') }}
                  </a-button>
                </a-form-item>
              </a-form>
            </a-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { Icon } from '@arco-design/web-vue';

  import { listTransaction, ListTransactionData } from '@/api/transaction';
  import { useI18n } from 'vue-i18n';

  const IconFont = Icon.addFromIconFontCn({
    src: 'https://at.alicdn.com/t/c/font_4374408_9o4y2llzel.js',
  });
  const { t } = useI18n();

  const columns = [
    {
      title: t('table.transactionId'),
      dataIndex: 'transactionId',
    },
    {
      title: t('table.amount'),
      dataIndex: 'amount',
    },
    {
      title: t('table.transactionDate'),
      dataIndex: 'transactionDate',
    },
    {
      title: t('table.status'),
      dataIndex: 'status',
    },
  ];
  const data = reactive([]);

  const isSearch = ref(false);

  function onSearch() {
    isSearch.value = !isSearch.value;
  }

  const pagation = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const listTransactionData: ListTransactionData = {
    current: pagation.current,
    pageSize: pagation.pageSize,
  };

  function getListTransaction() {
    listTransaction(listTransactionData).then((res) => {
      console.log(res);
      pagation.total = res.data.total;
    });
  }

  onMounted(() => {
    getListTransaction();
  });
</script>

<style scoped>
  .card-custom {
    :deep(.arco-card-body) {
      @apply h-full;
    }
  }
</style>
