<template>
  <!-- 底部 -->
  <div class="bottom">
    <!-- 版心 -->
    <div class="content">
      <!-- 左侧 -->
      <div class="left">京ICP备 13018369号 电话挂号010-56253825</div>
      <!-- 右侧 -->
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
  .bottom {
    width: 100%;
    height: 50px;
    background-color: #f0f2f5;

    .content {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #aaa;

      .right {
        span {
          margin: 0 5px;
          cursor: pointer;

          &:last-child {
            margin-right: 0;
          }

          &:hover {
            color: #000;
          }
        }
      }

    }
  }
</style>