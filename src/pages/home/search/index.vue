<template>
  <div class="search">
    <el-autocomplete
      :trigger-on-focus="false"
      clearable
      placeholder="请输入医院名称"
      v-model="hosname"
      :fetch-suggestions="fetchData"
      @select="goDetail"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
  // 引入 Element-Plus 的图标组件
  import { Search } from "@element-plus/icons-vue"
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import { reqHospitalByName } from "@/api/home"
  import type { HospitalByNameResponseData } from "@/api/type"
  // 展示的数据ts类型
  interface showData {
    value: string
    hoscode: string
  }

  const hosname = ref<string>("")
  const $router = useRouter()
  // 回调函数：当输入框的值发生变化时，会触发该函数
  // 参数1：输入框的值
  // 参数2：回调函数，当接口请求成功时，调用该回调函数
  const fetchData = async (keyword: string, cb: any) => {
    const res: HospitalByNameResponseData = await reqHospitalByName(keyword)
    if (res.code === 200) {
      // 展示数据
      let showData: showData[] = res.data.map((item) => {
        return {
          value: item.hosname,
          hoscode: item.hoscode,
        }
      })
      //给组件提供展示的数据
      cb(showData)
    }
  }
  //点击某一个推荐项
  const goDetail = (item: showData) => {
    //点击推荐项目进入医院详情页
    $router.push({
      path: "/hospital/reservation",
      query: {
        hoscode: item.hoscode,
      },
    })
  }
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
