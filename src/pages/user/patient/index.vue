<template>
  <!-- 就诊人组件的静态结构 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button class="button" type="primary" :icon="User" @click="addUser">
          添加就诊人
        </el-button>
      </div>
    </template>
    <!-- 就诊人管理模块展示就诊人信息的结构 -->
    <div class="visitors" v-if="scene === 0">
      <Visitor
        class="item"
        v-for="(user, index) in userArr"
        :key="user.id"
        :user="user"
        :index="index"
        @changeScene="changeScene"
      />
    </div>
    <!-- 添加就诊人|修改已有的就诊人信息的结构 -->
    <div class="form" v-if="scene === 1">
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请选择证件类型" style="width: 100%">
            <el-option label="xxx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请你选择日期"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请你输入用户手机号码"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"
        >建档信息（完善后部分医院首次就诊不排队建档）</el-divider
      >
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="婚姻状况">
          <el-radio-group>
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group>
            <el-radio :label="1">自费</el-radio>
            <el-radio :label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前的住址"> xxx </el-form-item>
        <el-form-item label="详细地址">
          <el-input placeholder="请输入用户详细地址"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">联系人信息（选填）</el-divider>
      <el-form style="width: 60%; margin: 10px auto" label-width="80">
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select placeholder="请选择证件类型" style="width: 100%">
            <el-option label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入用户手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default">提交</el-button>
          <el-button type="primary" size="default">重写</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
  import Visitor from "@/pages/hospital/reservation/visitor.vue"
  import { User } from "@element-plus/icons-vue"
  import { onMounted, ref } from "vue"
  import { reqGetUser } from "@/api/hospital"
  import { UserResponseData, UserArr } from "@/api/type"
  // 存储全部就诊人的信息
  const userArr = ref<UserArr>([])
  // 定义一个响应式数据:决定卡片的身体部分的展示内容
  const scene = ref<number>(0)
  // 组件挂载完毕获取一次就诊人的信息
  onMounted(() => {
    // 获取就诊人信息
    getAllUser()
  })
  // 获取全部就诊人信息
  const getAllUser = async () => {
    let res: UserResponseData = await reqGetUser()
    if (res.code == 200) {
      userArr.value = res.data
    }
  }
  // 添加就诊人按钮的回调
  const addUser = () => {
    // 切换场景为1
    scene.value = 1
  }
  // 就诊人子组件自定义事件的回调
  const changeScene = () => {
    scene.value = 1
  }
</script>

<style scoped lang="scss">
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .visitors {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 32%;
      margin: 5px;
    }
  }
</style>
