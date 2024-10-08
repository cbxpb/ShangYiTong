<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片:展示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User" @click="goUser">
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
        @click="submitOrder"
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
  import { reqSubmitOrder } from "@/api/user"
  import {
    UserResponseData,
    UserArr,
    DoctorInfoResponseData,
    Doctor,
    SubmitOrderResponseData,
  } from "@/api/type"
  import { useRoute, useRouter } from "vue-router"
  import { ElMessage } from "element-plus"
  // 获取路由对象
  const $route = useRoute()
  // 获取路由器对象
  const $router = useRouter()
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
  // 确定挂号按钮的回调
  const submitOrder = async () => {
    // 医院编号
    let hoscode = doctor.value.hoscode
    // 医生的ID
    let scheduleId = doctor.value.id
    // 就诊人的ID
    let patientId = userArr.value[currentIndex.value].id
    //提交订单
    let res: SubmitOrderResponseData = await reqSubmitOrder(
      hoscode,
      scheduleId,
      patientId
    )
    console.log(hoscode, scheduleId, patientId, res)
    //提交订单成功
    if (res.code === 200) {
      $router.push({ path: "/user/order", query: { orderId: res.data } })
    } else {
      // 接口挂了后测试
      console.log(res, "接口挂了")
      $router.push({ path: "/user/order", query: { orderId: "7249" } })
      ElMessage({
        type: "error",
        message: res.message,
      })
    }
  }
  // 预约挂号添加就诊人按钮的方法
  const goUser = () => {
    // 路由跳转
    $router.push({
      path: "/user/patient",
      query: { type: "add" },
    })
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
