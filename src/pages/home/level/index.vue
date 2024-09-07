<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <!-- 左侧 -->
      <div class="left">等级:</div>
      <!-- 右侧 -->
      <ul class="right">
        <li class="active">全部</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
  .level {
    color: #7f7f7f;
    h1 {
      font-weight: bold;
      margin: 10px 0;
    }
    .content {
      display: flex;
      .left {
        margin-right: 10px;
      }
      .right {
        display: flex;
        li {
          margin-right: 10px;
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
