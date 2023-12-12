<template>
  <div class="container">
    <div class="content"> 111 </div>
    <div class="sider">
      <div class="sider-top"></div>
      <div class="sider-middle"></div>
      <div class="sider-bottom"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100%;
    width: 100%;

    .content {
      flex: 1;
      padding: 20px 20px 0 20px;
      // 垂直居中
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .sider {
      width: 300px;
      padding: 20px 20px 0 20px;
      background: var(--td-bg-color);
      display: flex;
      flex-direction: column;
      justify-content: center;

      &-top {
        height: 200px;
        background: var(--td-gray-color-1);
      }

      &-middle {
        height: 100px;
        background: var(--td-gray-color-2);
      }

      &-bottom {
        height: calc(100% - 300px);
        background: var(--td-gray-color-4);
      }
    }
  }

  .outerWarper {
    width: 100%;
    height: 100%;
    position: relative;

    .shadow {
      position: absolute;
      width: 100%;
      height: 22px;
      bottom: 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        #ffffff 100%
      );
    }

    .number {
      font-weight: 600;
      position: absolute;
      right: 0;
      font-size: 14px;
      line-height: 22px;
    }

    .item {
      position: relative;
      display: flex;
      align-items: center;
      color: var(--td-text-color-secondary);
      font-size: 14px;
      line-height: 22px;

      span {
        display: block;
        left: 1px;
        width: 5px;
        height: 5px;
        border-radius: 10px;
        margin-right: 4px;
      }
    }

    .error {
      background: var(--td-error-color);
    }

    .warning {
      background: var(--td-warning-color);
    }

    .success {
      background: var(--td-success-color);
    }

    .slotWarper {
      position: absolute;
      bottom: 2px;
      left: 5px;
    }
  }
</style>
