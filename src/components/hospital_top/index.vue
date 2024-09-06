<template>
  <!-- 顶部 -->
  <div class="top">
    <!-- 版心 -->
    <div class="content">
      <!-- 左侧 -->
      <div class="left">
        <img src="../../assets/images/logo.png" alt="logo">
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login">登录/注册</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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
      }
    }
  }
</style>