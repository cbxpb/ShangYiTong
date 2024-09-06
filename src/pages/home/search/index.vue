<template>
  <div class="search">
    <el-autocomplete clearable placeholder="请输入医院名称" />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
  // 引入 Element-Plus 的图标组件
  import { Search } from "@element-plus/icons-vue"
</script>

<style lang="scss" scoped>
  // 深度选择器: >>> /deep/ :deep()
  .search {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    :deep(.el-autocomplete) {
      width: 600px;
    }
  }
</style>
