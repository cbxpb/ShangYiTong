<template>
  <!-- 实名认证组件的结构 -->
  <el-card class="box-card">
    <!-- 卡片的头部 -->
    <template #header>
      <div class="card-header">
        <h1>实名信息</h1>
      </div>
    </template>
    <!-- 实名认证结构的提示部分 -->
    <div class="tip" style="color: #7f7f7f">
      <p>
        <el-icon><InfoFilled /></el-icon
        >完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
      </p>
    </div>
    <!-- 卡片身体的底部:认证成功的结构、认证未成功的结构 -->
    <el-descriptions
      v-if="userInfo.authStatus === 1"
      size="small"
      class="margin-top"
      :column="1"
      border
      style="margin: 20px auto; width: 60%"
    >
      <el-descriptions-item align="center" width="20px">
        <template #label>
          <div class="cell-item">用户姓名</div>
        </template>
        {{ userInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item align="center" width="20px">
        <template #label>
          <div class="cell-item">证件类型</div>
        </template>
        {{ userInfo.certificatesType === "10" ? "身份证" : "户口本" }}
      </el-descriptions-item>
      <el-descriptions-item align="center" width="20px">
        <template #label>
          <div class="cell-item">证件号码</div>
        </template>
        {{ userInfo.certificatesNo }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- 用户未实名的结构 -->
    <el-form
      v-if="userInfo.authStatus === 0"
      style="width: 60%; margin: 20px auto"
      label-width="80"
      :model="params"
      ref="form"
      :rules="rules"
    >
      <el-form-item label="用户姓名" prop="name">
        <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select
          style="width: 100%"
          placeholder="请选择证件类型"
          v-model="params.certificatesType"
        >
          <el-option
            v-for="(item, index) in arrType"
            :label="item.name"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input
          placeholder="请输入证件号码"
          v-model="params.certificatesNo"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传证件" prop="certificatesUrl">
        <!-- action:upload组件向服务器提交图片路径
             limit:照片墙约束图片个数
             on-exceed:超出约束数量的钩子
        -->
        <el-upload
          ref="upload"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          :on-success="successhandler"
          :on-exceed="exceedhandler"
          :limit="1"
          action="/api/oss/file/fileUpload?fileHost=userAuah"
        >
          <img
            style="width: 100%; height: 100%"
            src="../../../assets/images/auth_example.png"
            alt=""
          />
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            v-if="params.certificatesUrl"
            style="width: 100%; height: 100%"
            :src="params.certificatesUrl"
            alt="Preview Image"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="submit">
          提交
        </el-button>
        <el-button type="primary" size="default" @click="reset">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
  //引入element-plus图标
  import { InfoFilled } from "@element-plus/icons-vue"
  // 获取用户信息
  import { reqUserInfo, reqCertationType, reqUserCertation } from "@/api/user"
  // 数据类型
  import type {
    AccountInfo,
    AccountInfoResponseData,
    CertationTypeResponseData,
    CertationArr,
    UserParams,
  } from "@/api/type"
  import { onMounted, ref } from "vue"
  import { ElMessage } from "element-plus"

  // 数据
  const userInfo = ref<AccountInfo>({} as AccountInfo)
  const arrType = ref<CertationArr>([])
  // 获取form、upload组件
  const form = ref()
  const upload = ref()
  // 控制对话框的显示与隐藏
  const dialogVisible = ref<boolean>(false)
  //收集用户表单认证的数据
  const params = ref<UserParams>({
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  })
  // 组件挂载完毕
  onMounted(() => {
    // 获取用户信息的方法
    getUserInfo()
    // 获取证件类型的接口
    getType()
  })
  // 获取用户信息方法
  const getUserInfo = async () => {
    let res: AccountInfoResponseData = await reqUserInfo()
    if (res.code == 200) {
      userInfo.value = res.data
    }
  }
  // 获取证件类型的数据
  const getType = async () => {
    let res: CertationTypeResponseData = await reqCertationType()
    if (res.code == 200) {
      arrType.value = res.data
    }
  }
  // 图片超出数量的钩子
  const exceedhandler = () => {
    ElMessage({
      type: "error",
      message: "图片只能上传一张图片",
    })
  }
  // 图片上传成功的钩子
  const successhandler = (response: any) => {
    // 如果图片上传成功校验结果清除
    form.value.clearValidate("certificatesUrl")
    // 收集上传成功图片地址
    // response:上传图片请求服务器返回的数据
    // uploadFile上传文件对象
    params.value.certificatesUrl = response.data
  }
  // 照片墙预览的钩子
  const handlePictureCardPreview = () => {
    // 触发预览的钩子的时候，对话框显示
    dialogVisible.value = true
  }
  // 照片墙删除图片的钩子
  const handleRemove = () => {
    params.value.certificatesUrl = ""
  }
  // 重写按钮的回调
  const reset = () => {
    // 清除文件上传列表
    upload.value.clearFiles()
    // 清空数据
    Object.assign(params.value, {
      certificatesNo: "",
      certificatesType: "",
      certificatesUrl: "",
      name: "",
    })
  }
  // 提交按钮的回调
  const submit = async () => {
    // 全部的表单校验通过返回一个成功的promise
    // 如果有一个表单校验失败返回的是一个失败的promise对象,后面的语句就不在执行了
    await form.value.validate()
    try {
      // 认证成功
      await reqUserCertation(params.value)
      // 提示消息
      ElMessage({
        type: "success",
        message: "认证成功",
      })
      // 认证成功以后再次获取用户信息
      getUserInfo()
    } catch (error) {
      ElMessage({
        type: "error",
        message: "认证失败",
      })
    }
  }
  // 自定义校验规则姓名方法
  const validatorName = (_rule: any, value: any, callBack: any) => {
    // rule:即为当前校验字段的校验规则对象
    const reg =
      /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/
    if (reg.test(value)) {
      callBack()
    } else {
      callBack(new Error("请输入正确的名字"))
    }
  }
  // 证件类型校验的方法
  const validatorType = (_rule: any, value: any, callBack: any) => {
    if (value == "10" || value == "20") {
      callBack()
    } else {
      callBack(new Error("请选择证件的类型"))
    }
  }
  // 证件号码的校验方法
  const validatorNo = (_rule: any, value: any, callBack: any) => {
    const sfz =
      /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
    const hkb = /^\d{9}$/
    if (sfz.test(value) || hkb.test(value)) {
      callBack()
    } else {
      callBack(new Error("请输入正确的身份证或者户口本的号码"))
    }
  }
  // 证件照图片的
  const validatorUrl = (_rule: any, value: any, callBack: any) => {
    if (value.length) {
      callBack()
    } else {
      callBack(new Error("请上传证件照图片"))
    }
  }
  // 表单校验
  const rules = {
    // 用户姓名的校验规则
    // required:true,代表当前字段务必进行校验
    name: [
      {
        required: true,
        validator: validatorName,
      },
    ],
    certificatesType: [
      {
        required: true,
        validator: validatorType,
      },
    ],
    certificatesNo: [
      {
        required: true,
        validator: validatorNo,
      },
    ],
    certificatesUrl: [
      {
        required: true,
        validator: validatorUrl,
      },
    ],
  }
</script>

<style scoped lang="scss">
  .box-card {
    .tip {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
