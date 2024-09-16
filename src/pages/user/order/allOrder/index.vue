<template>
  <!-- 展示全部订单的结构 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <!-- 提供用户选择的下拉菜单 -->
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <el-select
          style="width: 220px"
          placeholder="请选择就诊人"
          v-model="patientId"
          @change="getOrderInfo(1)"
        >
          <el-option label="请选择全部就诊人" value=""></el-option>
          <el-option
            v-for="item in allUser"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select
          style="width: 220px"
          placeholder="请选择订单状态"
          v-model="orderStatus"
          @change="getOrderInfo(1)"
        >
          <el-option label="全部订单" value=""></el-option>
          <el-option
            v-for="(item, index) in allOrderState"
            :key="index"
            :label="item.comment"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 表格展示订单的数据 -->
    <el-table border style="margin: 10px 0px" :data="allOrderArr">
      <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
      <el-table-column label="医院" prop="hosname"></el-table-column>
      <el-table-column label="科室" prop="depname"></el-table-column>
      <el-table-column label="医生" prop="title"></el-table-column>
      <el-table-column label="服务费" prop="amount"></el-table-column>
      <el-table-column label="就诊人" prop="patientName"></el-table-column>
      <el-table-column label="订单状态" prop="param.orderStatusString">
      </el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="primary" link @click="goDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getOrderInfo"
      @size-change="handler"
    />
  </el-card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import { reqUserOrderInfo, reqOrderState } from "@/api/user"
  import { reqGetUser } from "@/api/hospital"
  import {
    UserOrderInfoResponseData,
    Records,
    OrderInfo,
    UserResponseData,
    AllOrderStateResponseData,
    UserArr,
    AllOrderState,
  } from "@/api/type"
  import { useRouter } from "vue-router"
  const $router = useRouter()
  // 页面所需数据
  const pageNum = ref<number>(1)
  const pageSize = ref<number>(10)
  const total = ref<number>(0)
  // 收集就诊人的ID
  const patientId = ref<string>("")
  // 订单的状态
  const orderStatus = ref<string>("")
  // 存储全部的订单
  const allOrderArr = ref<Records>([])
  // 存储全部就诊人的信息
  const allUser = ref<UserArr>([])
  // 存储全部订单的状态
  const allOrderState = ref<AllOrderState>([])
  // 组件挂载完毕的钩子
  onMounted(() => {
    // 获取订单的方法
    getOrderInfo()
    // 获取全部就诊人的信息以及获取全部的订单的状态
    getData()
  })
  // 获取所有订单数据的方法
  const getOrderInfo = async (pager: number = 1) => {
    pageNum.value = pager
    let res: UserOrderInfoResponseData = await reqUserOrderInfo(
      pageNum.value,
      pageSize.value,
      patientId.value,
      orderStatus.value
    )
    if (res.code === 200) {
      allOrderArr.value = res.data.records
      total.value = res.data.total
    }
  }
  // 详情按钮的回调
  const goDetail = (row: OrderInfo) => {
    $router.push({ path: "/user/order", query: { orderId: row.id } })
  }
  // 下拉菜单事件的回调
  const handler = (pageSizes: number) => {
    pageSize.value = pageSizes
    getOrderInfo()
  }
  // 获取就诊人与订单状态接口方法
  const getData = async () => {
    //获取全部的就诊人信息
    const res: UserResponseData = await reqGetUser()
    //获取全部的订单状态
    const res1: AllOrderStateResponseData = await reqOrderState()
    allUser.value = res.data
    allOrderState.value = res1.data
  }
</script>

<style scoped lang="scss"></style>
