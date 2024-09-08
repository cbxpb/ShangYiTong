<template>
  <div class="region">
    <div class="content">
      <!-- 左边 -->
      <div class="left">地区:</div>
      <!-- 右边 -->
      <ul class="right">
        <li :class="{ active: activeFlag === '' }" @click="changeRegion('')">
          全部
        </li>
        <li
          v-for="region in RegionArr"
          :key="region.id"
          :class="{ active: activeFlag === region.value }"
          @click="changeRegion(region.value)"
        >
          {{ region.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { reqHospitalLevelAndRegion } from "@/api/home"
  import { onMounted, ref } from "vue"
  import type {
    HospitalLevelAndRegionResponseData,
    HospitalLevelAndRegionArr,
  } from "@/api/type"
  // 自定义事件声明类型
  const emites = defineEmits<{
    (e: "getRegion", value: string): void
  }>()
  // 定义地区的数据
  const RegionArr = ref<HospitalLevelAndRegionArr>([])
  // 地区列表高亮
  const activeFlag = ref<string>("")
  // 组件挂载完毕
  onMounted(() => {
    getRegionArr()
  })
  // 获取地区的数据
  const getRegionArr = async () => {
    const res: HospitalLevelAndRegionResponseData =
      await reqHospitalLevelAndRegion("Beijin")
    if (res.code === 200) {
      RegionArr.value = res.data
    }
  }
  // 切换地区
  const changeRegion = (value: string) => {
    activeFlag.value = value
    emites("getRegion", value)
  }
</script>
<style scoped lang="scss">
  .region {
    color: #7f7f7f;
    margin-top: 10px;
    .content {
      display: flex;
      .left {
        flex-shrink: 0;
        margin-right: 10px;
      }
      .right {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          &.active {
            color: #55a6fe;
          }
          &:hover {
            color: #55a6fe;
          }
        }
      }
    }
  }
</style>
