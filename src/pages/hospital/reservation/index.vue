<template>
  <div class="register">
    <div class="top">
      <div class="title">
        {{ hospitalInfoStore.hospitalInfo?.hospital.hosname }}
      </div>
      <div class="level">
        <svg
          t="1685174493331"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2418"
          width="16"
          height="16"
        >
          <path
            d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
            p-id="2419"
            fill="#d81e06"
          ></path>
        </svg>
        <span>{{
          hospitalInfoStore.hospitalInfo?.hospital.param.hostypeString
        }}</span>
      </div>
    </div>
    <!-- 展示内容区域 -->
    <div class="content">
      <div class="left">
        <img
          v-if="hospitalInfoStore.hospitalInfo?.hospital.logoData"
          :src="`data:image/jpeg;base64,${hospitalInfoStore.hospitalInfo?.hospital.logoData}`"
          alt="医院图片"
        />
      </div>
      <div class="right">
        <div>挂号规则</div>
        <div class="time">
          预约周期:10天 放号时间:{{
            hospitalInfoStore.hospitalInfo?.bookingRule.releaseTime
          }}
          停挂时间:{{ hospitalInfoStore.hospitalInfo?.bookingRule.stopTime }}
        </div>
        <div class="address">
          具体位置:{{
            hospitalInfoStore.hospitalInfo?.hospital.param.fullAddress
          }}
        </div>
        <div class="route">
          具体路线:{{ hospitalInfoStore.hospitalInfo?.hospital.route }}
        </div>
        <div class="releasetime">
          退号时间:就诊前一工作日{{
            hospitalInfoStore.hospitalInfo?.bookingRule.quitTime
          }}前取消
        </div>
        <div class="rule">预约挂号规则</div>
        <div
          class="ruleInfo"
          v-for="(item, index) in hospitalInfoStore.hospitalInfo?.bookingRule
            .rule"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 放置每一个医院的科室的数据 -->
    <div class="deparment">
      <div class="leftNav">
        <ul>
          <li
            v-for="(deparment, index) in hospitalInfoStore.departmentList"
            :key="deparment.depcode"
            :class="{ active: currentIndex === index }"
            @click="changeIndex(index)"
          >
            {{ deparment.depname }}
          </li>
        </ul>
      </div>
      <div class="deparmentInfo">
        <!-- 用一个div代表:大科室与小科室 -->
        <div
          class="showDeparment"
          v-for="deparment in hospitalInfoStore.departmentList"
          :key="deparment.depcode"
        >
          <h1 ref="cur">{{ deparment.depname }}</h1>
          <!-- 每一个大的科室下小科室 -->
          <ul>
            <li
              v-for="item in deparment.children"
              :key="item.depcode"
              @click="goReservation(item)"
            >
              {{ item.depname }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from "vue"
  import { useRouter, useRoute } from "vue-router"
  //引入医院详情仓库的数据
  import { useHospitalInfoStore } from "@/store/hospitalInfo"
  import { useUserStore } from "@/store/user"
  import { Deparment } from "@/api/type"
  const hospitalInfoStore = useHospitalInfoStore()
  const userStore = useUserStore()
  const $router = useRouter()
  const $route = useRoute()

  // 高亮导航的索引值
  const currentIndex = ref<number>(0)
  // 获取所以h1的dom元素
  const cur = ref<HTMLDivElement[]>([])
  // 改变索引值并滚动位置
  const changeIndex = (index: number) => {
    currentIndex.value = index
    // 滚动到指定位置
    cur.value[currentIndex.value].scrollIntoView({ behavior: "smooth" })
  }
  // 进入预约挂号页面
  const goReservation = (item: Deparment) => {
    $router.push({
      path: "/hospital/reservation_step1",
      query: {
        hoscode: $route.query.hoscode,
        depcode: item.depcode,
      },
    })
    userStore.visiable = false
  }
</script>
<style scoped lang="scss">
  .register {
    .top {
      display: flex;
      .title {
        font-size: 30px;
        font-weight: 900;
      }
      .level {
        color: #7f7f7f;
        margin-left: 10px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        span {
          margin-left: 5px;
        }
      }
    }
    .content {
      display: flex;
      margin-top: 20px;
      .left {
        width: 80px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      .right {
        flex: 1;
        font-size: 14px;
        margin-left: 20px;
        .time,
        .address,
        .route,
        .releasetime,
        .ruleInfo {
          margin-top: 10px;
          color: #7f7f7f;
        }
        .rule {
          margin: 10px 0px;
        }
      }
    }
    .deparment {
      width: 100%;
      height: 500px;
      display: flex;
      margin-top: 20px;
      .leftNav {
        width: 80px;
        height: 100%;
        ul {
          width: 100%;
          height: 100%;
          background: rgb(248, 248, 248);
          display: flex;
          flex-direction: column;
          li {
            cursor: pointer;
            flex: 1;
            text-align: center;
            color: #7f7f7f;
            font-size: 14px;
            line-height: 40px;
            &.active {
              border-left: 1px solid red;
              color: red;
              background: white;
            }
          }
        }
      }
      .deparmentInfo {
        overscroll-behavior: contain;
        flex: 1;
        margin-left: 20px;
        height: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .showDeparment {
          h1 {
            background-color: rgb(248, 248, 248);
            color: #7f7f7f;
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              cursor: pointer;
              color: #7f7f7f;
              width: 33%;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
</style>
