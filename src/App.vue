<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop />
    <!-- 路由组件 -->
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- 底部全局组件 -->
    <HospitalBottom />
    <!-- 登录组件 -->
    <Login />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
      margin-top: 70px;
      width: 1200px;
      min-height: 700px;
    }
  }
</style>
