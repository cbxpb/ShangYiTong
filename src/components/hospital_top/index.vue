<template>
  <!-- 顶部 -->
  <div class="top">
    <!-- 版心 -->
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="logo" />
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <!-- 如果没有用户名字:显示登录注册 -->
        <p class="login" @click="login" v-if="!userStore.userInfo.name">
          登录/注册
        </p>
        <!-- 如果有用户信息展示用户信息 -->
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item>挂号订单</el-dropdown-item>
              <el-dropdown-item>就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useRouter } from "vue-router"
  import { useUserStore } from "@/store/user"
  import { ArrowDown } from "@element-plus/icons-vue"
  //获取路由器对象
  const $router = useRouter()
  //获取用户仓库
  const userStore = useUserStore()
  //回到首页
  const goHome = () => {
    $router.push({ path: "/home" })
  }
  //点击登录与注册按钮的时候弹出对话框
  const login = () => {
    userStore.visiable = true
  }
  //退出登录按钮的回调
  const logout = () => {
    //通知pinia仓库清除用户相关的信息
    userStore.logout()
    //编程式导航路由跳转到首页
    $router.push({ path: "/home" })
  }
</script>
<style lang="scss" scoped>
  .top {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 70px;
    background-color: #fff;

    .content {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }

        p {
          font-size: 20px;
          color: #55a6fe;
        }
      }

      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #aaa;
        font-weight: bold;

        p {
          cursor: pointer;
          margin-right: 10px;

          &:last-child {
            margin-right: 0;
          }

          &:hover {
            color: #55a6fe;
          }
        }

        :deep(.el-dropdown-link) {
          cursor: pointer;
          &:hover {
            color: #55a6fe;
          }
        }
      }
    }
  }
</style>
