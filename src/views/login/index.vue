<template>
  <div h-screen flex class="body">
    <div relative flex flex-1 items-center justify-center>
      <LoginForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .body {
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
    background-color: var(--color-fill-1);
  }
</style>
