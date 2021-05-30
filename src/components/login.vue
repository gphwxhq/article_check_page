<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <van-form @submit="onSubmit">
    <van-field
      v-model="state.username"
      name="name"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="state.password"
      type="password"
      name="passwd"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <!-- <div style="margin: 16px"> -->
      <van-field name="radio">
        <template #input>
          <van-radio-group v-model="state.radio" direction="horizontal">
            <van-radio name="1">学生</van-radio>
            <van-radio name="2">教师</van-radio>
            <van-radio name="3">管理员</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    <!-- </div> -->
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "login",
  // data() {
  //   return {
  //     radio: "1",
  //   };
  // },
  components: {},
  setup() {
    const state = reactive({
      username: "",
      password: "",
      radio: "1",
    });
    const onSubmit = (values) => {
      console.log("submit", values);
    };

    return {
      state,
      onSubmit,
    };
  },
};
</script>
<style>
#app {
  padding: 10px;
  border-radius: 10px;
  position: relative;
  top: 50%;
  width: 60%;
  transform: translateY(-50%);
  /* height: 100%; */
  margin: 0 auto;
  background-color: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
