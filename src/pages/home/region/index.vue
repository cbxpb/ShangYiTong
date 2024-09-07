<template>
  <div class="region">
    <div class="content">
      <!-- 左边 -->
      <div class="left">地区:</div>
      <!-- 右边 -->
      <ul class="right">
        <li class="active">全部</li>
        <li>xxx</li>
        <li>xxx</li>
        <li>xxx</li>
        <li>xxx</li>
        <li>xxx</li>
        <li>xxx</li>
        <li>xxx</li>
        <li>xxx</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
  .region {
    color: #7f7f7f;
    margin-top: 10px;
    .content {
      display: flex;
      .left {
        flex-shrink: 0;
        margin-right: 10px;
      }
      .right {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 10px;
          margin-bottom: 10px;
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
