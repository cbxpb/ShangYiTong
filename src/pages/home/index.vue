<template>
  <div>
    <!-- 首页轮播图 -->
    <Swiper></Swiper>
    <!-- 首页搜索区域 -->
    <Search></Search>
    <!-- 医院结构展示 -->
    <el-row :gutter="20">
      <!-- 左侧 -->
      <el-col :span="20">
        <!-- 医院等级子组件 -->
        <Level></Level>
        <!-- 医院地区子组件 -->
        <Region></Region>
        <!-- 医院信息卡片子组件 -->
        <div class="cards">
          <Card class="item" v-for="item in 10" :key="item"></Card>
        </div>
        <!-- 底部分页器 -->
        <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40"
        />
      </el-col>
      <!-- 右侧 -->
      <el-col :span="4"> 123 </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
  // 引入轮播组件
  import Swiper from "./swiper/index.vue"
  // 引入搜索组件
  import Search from "./search/index.vue"
  // 引入医院等级子组件
  import Level from "./level/index.vue"
  // 引入医院地区子组件
  import Region from "./region/index.vue"
  // 引入医院信息卡片子组件
  import Card from "./card/index.vue"

  // 引入 Vue 组合式API的函数
  import { ref } from "vue"
  // 分页器需要的数据
  // pageNum --> 页码 | pageSize --> 每页条数
  const pageNum = ref<number>(1)
  const pageSize = ref<number>(10)
</script>
<style lang="scss" scoped>
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 48%;
      margin: 10px 0;
    }
  }
</style>
