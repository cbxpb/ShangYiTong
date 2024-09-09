<template>
  <div>
    <div class="info">
      <h1>{{ hospitalInfoStore.hospitalInfo?.hospital?.hosname }}查询/取消</h1>
      <el-empty description="暂无信息" />
    </div>
  </div>
</template>

<script setup lang="ts">
  //引入医院详情仓库的数据
  import { useHospitalInfoStore } from "@/store/hospitalInfo"
  const hospitalInfoStore = useHospitalInfoStore()
</script>

<style scoped lang="scss">
.info {
  h1 {
    text-align: center;
    font-size: 30px;
  }
}
</style>
