<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片:展示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User">
            添加就诊人
          </el-button>
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <Visitor
          v-for="(user, index) in userArr"
          :key="user.id"
          class="item"
          :user="user"
          @click="changeIndex(index)"
          :index="index"
          :currentIndex="currentIndex"
        />
      </div>
    </el-card>
    <!-- 卡片:展示医生的信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片身体部分:展示医生的信息 -->
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期:</div>
          </template>
          {{ doctor.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院:</div>
          </template>
          {{ doctor.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室:</div>
          </template>
          {{ doctor.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名:</div>
          </template>
          {{ doctor.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称:</div>
          </template>
          {{ doctor.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长:</div>
          </template>
          {{ doctor.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务费:</div>
          </template>
          <span style="color: red">{{ doctor.amount }}元</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 确定挂号按钮 -->
    <div class="btn">
      <el-button
        type="primary"
        size="default"
        :disabled="currentIndex === -1 ? true : false"
      >
        确认挂号
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { User } from "@element-plus/icons-vue"
  import Visitor from "./visitor.vue"
  import { ref, onMounted } from "vue"
  import { reqGetUser, reqDoctorInfo } from "@/api/hospital"
  import {
    UserResponseData,
    UserArr,
    DoctorInfoResponseData,
    Doctor,
  } from "@/api/type"
  import { useRoute } from "vue-router"
  // 获取路由对象
  const $route = useRoute()
  // 存储就诊人信息
  const userArr = ref<UserArr>([])
  // 存储医生信息
  const doctor = ref<Doctor>({} as Doctor)
  // 存储用户确定就诊人索引值
  const currentIndex = ref<number>(-1)
  onMounted(() => {
    // 获取就诊人信息
    getUserData()
    // 获取医生信息
    getDoctorInfo()
  })
  // 获取就诊人信息
  const getUserData = async () => {
    let res: UserResponseData = await reqGetUser()
    if (res.code === 200) {
      userArr.value = res.data
    }
  }
  // 获取医生信息
  const getDoctorInfo = async () => {
    let res: DoctorInfoResponseData = await reqDoctorInfo(
      $route.query.docId as string
    )
    if (res.code === 200) {
      doctor.value = res.data
    }
  }
  // 改变就诊人索引值
  const changeIndex = (index: number) => {
    // 存储当前用户选中的就诊人信息索引值
    currentIndex.value = index
  }
</script>

<style scoped lang="scss">
  .container {
    .tip {
      font-weight: 900;
      color: #7f7f7f;
      font-size: 20px;
    }
    .box-card {
      margin: 20px 0px;
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .user {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 32%;
          margin: 5px;
        }
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      margin: 10px 0px;
    }
  }
</style>
