<template>
  <div class="hospital">
    <!-- 左侧导航区域 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/</span>
        <span>医院信息</span>
      </div>
      <el-menu :default-active="$route.path">
        <el-menu-item
          index="/hospital/reservation"
          @click="changeActive('/hospital/reservation')"
        >
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/detail"
          @click="changeActive('/hospital/detail')"
        >
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/notice"
          @click="changeActive('/hospital/notice')"
        >
          <el-icon><setting /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/information"
          @click="changeActive('/hospital/information')"
        >
          <el-icon><InfoFilled /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item
          index="/hospital/search"
          @click="changeActive('/hospital/search')"
        >
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
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
  import { useRouter, useRoute } from "vue-router"
  import { onMounted } from "vue"
  import { useHospitalInfoStore } from "@/store/hospitalInfo"
  const $router = useRouter()
  const $route = useRoute()
  // 获取仓库对象
  const hospitalInfoStore = useHospitalInfoStore()

  //左侧菜单点击事件的回调
  const changeActive = (path: string) => {
    //跳转到对应二级路由
    $router.push({ path })
  }

  onMounted(() => {
    let hoscode: string = $route.query.hoscode as string
    if (hospitalInfoStore.hoscode === hoscode) {
      console.log("走缓存")
    } else {
      console.log("重新获取", hoscode)
      hospitalInfoStore.getHospitalInfo(hoscode)
    }
  })
</script>
<style lang="scss" scoped>
  .hospital {
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
