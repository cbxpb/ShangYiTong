<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <!-- 左侧 -->
      <div class="left">等级:</div>
      <!-- 右侧 -->
      <ul class="right">
        <li :class="{ active: activeFlag === '' }" @click="changeLevel('')">
          全部
        </li>
        <li
          :class="{ active: activeFlag === level.value }"
          v-for="level in LevelArr"
          :key="level.id"
          @click="changeLevel(level.value)"
        >
          {{ level.name }}
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
    (e: "getLevel", value: string): void
  }>()
  // 定义医院等级的数据
  const LevelArr = ref<HospitalLevelAndRegionArr>([])
  // 医院等级高亮
  const activeFlag = ref<string>("")
  // 组件挂载完毕
  onMounted(() => {
    getLevelArr()
  })
  // 获取医院等级的数据
  const getLevelArr = async () => {
    const res: HospitalLevelAndRegionResponseData =
      await reqHospitalLevelAndRegion("hostype")
    if (res.code === 200) {
      LevelArr.value = res.data
    }
  }
  // 切换医院等级
  const changeLevel = (value: string) => {
    activeFlag.value = value
    emites("getLevel", value)
  }
</script>
<style lang="scss" scoped>
  .level {
    color: #7f7f7f;
    h1 {
      font-weight: bold;
      margin: 10px 0;
    }
    .content {
      display: flex;
      .left {
        margin-right: 10px;
      }
      .right {
        display: flex;
        li {
          margin-right: 10px;
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
