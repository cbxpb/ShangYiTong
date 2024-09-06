<template>
  <div>
    <!-- 首页轮播图 -->
    <Swiper></Swiper>
    <!-- 首页搜索表单区域 -->
    <Search></Search>
  </div>
</template>
<script setup lang="ts">
  // 引入轮播组件
  import Swiper from "./swiper/index.vue"
  // 引入搜索表单组件
  import Search from "./search/index.vue"
</script>
<style lang="scss" scoped></style>
