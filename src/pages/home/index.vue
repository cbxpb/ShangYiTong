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
        <Level @getLevel="getLevel"></Level>
        <!-- 医院地区子组件 -->
        <Region @getRegion="getRegion"></Region>
        <!-- 医院信息卡片子组件 -->
        <!-- 有数据 -->
        <template v-if="hospitalArr.length > 0">
          <div class="cards">
            <Card
              class="item"
              v-for="item in hospitalArr"
              :key="item.cityCode"
              :hospitalArr="item"
            ></Card>
          </div>
        </template>
        <!-- 没数据 -->
        <template v-else>
          <el-empty description="暂无数据！" />
        </template>
        <!-- 底部分页器 -->
        <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-col>
      <!-- 右侧 -->
      <el-col :span="4"> <Tip></Tip> </el-col>
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
  // 引入右侧组件
  import Tip from "./tip/index.vue"
  // 数据类型
  import type { HospitalResponseData, Content } from "@/api/type"
  // 引入 Vue 组合式API的函数
  import { onMounted, ref } from "vue"
  // 引入接口API
  import { reqHospital } from "@/api/home"
  // 分页器需要的数据
  // pageNum --> 页码 | pageSize --> 每页条数
  const pageNum = ref<number>(1)
  const pageSize = ref<number>(10)
  // 存储已有的医院数据
  const hospitalArr = ref<Content>([])
  // 存储医院总数
  const total = ref<number>(0)
  //存储医院的等级相应数据
  const hostype = ref<string>("")
  //存储医院的地区
  const districtCode = ref<string>("")

  // 组件挂载后执行
  onMounted(() => {
    getHospitalInfo()
  })
  // 获取医院数据
  const getHospitalInfo = async () => {
    // 获取医院的数据：默认页码为1，每页条数为10
    const res: HospitalResponseData = await reqHospital(
      pageNum.value,
      pageSize.value,
      hostype.value,
      districtCode.value
    )
    if (res.code === 200) {
      // 医院数据
      hospitalArr.value = res.data.content
      // 医院总数
      total.value = res.data.totalElements
    }
  }

  // 分页器改变时触发
  const currentChange = () => {
    getHospitalInfo()
  }
  // 每页条数改变时触发
  const sizeChange = () => {
    pageNum.value = 1
    getHospitalInfo()
  }

  // 自定义事件：获取医院等级
  const getLevel = (level: string) => {
    hostype.value = level
    getHospitalInfo()
  }
  // 自定义事件：获取医院地区
  const getRegion = (region: string) => {
    districtCode.value = region
    getHospitalInfo()
  }
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
