<template>
  <div class="user">
    <!-- 左侧导航区域 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/</span>
        <span>会员中心</span>
      </div>
      <el-menu :default-active="$route.path" :router="true">
        <el-menu-item index="/user/certification">
          <el-icon><icon-menu /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order">
          <el-icon><document /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient">
          <el-icon><setting /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/profile">
          <el-icon><InfoFilled /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback">
          <el-icon><Search /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区域:路由组件展示位置 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {
    HomeFilled,
    Menu as IconMenu,
    Document,
    Setting,
    InfoFilled,
    Search,
  } from "@element-plus/icons-vue"
  import { useRoute } from "vue-router"
  const $route = useRoute()
</script>
<style lang="scss" scoped>
  .user {
    margin-top: 20px;
    display: flex;
    .menu {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .top {
        color: #7f7f7f;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        & > span {
          margin-left: 5px;
        }
      }
    }
    .content {
      flex: 4;
    }
  }
</style>
