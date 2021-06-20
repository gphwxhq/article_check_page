<template>
  <!-- <router-link to="/stuPage">Go to Home</router-link> -->
  <transition name="van-slide-down">
    <div class="container" v-show="show">
      <img alt="Vue logo" src="../assets/logo.png" />
      <van-form @submit="onSubmit" ref="mform">
        <van-field
          v-model="state.userId"
          name="userId"
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
    </div>
  </transition>
</template>

<script>
// import { Notify } from "vant";
import { reactive } from "vue";
// import { useRouter} from 'vue-router'

export default {
  name: "login",
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      // console.log(this.$root.user)
      let data = {
        user: values.userId,
        passwd: values.passwd,
        role: values.radio,
      };
      console.log(data);

      // axios.post(url,data).then(function(res){
      //   console.log(res)
      // })
      let self = this;
      this.$http({
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
        method: "post",
        url: "/login",
        data: data,
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);
            if (res.data.LoginPass) {
              let storage = window.localStorage;
              storage["user"] = values.userId;
              if (values.radio == 1) self.$router.push({ path: "/stuPage" });
              else if (values.radio == 2)
                self.$router.push({ path: "/teacherPage" });
              else self.$router.push({ path: "/adminPage" });
            } else {
              self.state.password = "";
              self.$notify({ type: "danger", message: "用户名或密码错误" });
            }
          } else {
            self.$notify({ type: "danger", message: "网络连接错误" });
          }
        })
        .catch((err) => {
          console.log("rejected", err);
          self.$notify({ type: "danger", message: "网络连接错误" });
        });

      // if (values.userId == "1" && values.passwd == "1") {
      //   // this.$root.user = values.userId;
      //   let storage = window.localStorage;
      //   storage["user"] = values.userId;
      //   if (values.radio == 1) this.$router.push({ path: "/stuPage" });
      //   else if (values.radio == 2) this.$router.push({ path: "/teacherPage" });
      //   else this.$router.push({ path: "/adminPage" });
      // } else {
      //   this.state.password = "";
      //   this.$notify({ type: "danger", message: "用户名或密码错误" });
      //   // Notify({ type: "danger", message: '用户名或密码错误' });
      // }
    },
  },
  setup() {
    const state = reactive({
      userId: "",
      password: "",
      radio: "1",
    });
    // const onSubmit = (values) => {
    //   console.log("submit", values);
    //   const router=useRouter()
    //   router.push({ path: '/stuPage' })
    // };

    return {
      state,
      // onSubmit,
    };
  },
};
</script>
<style>
.container {
  padding: 10px;
  border-radius: 10px;
  position: relative;
  top: 50%;
  /* height: 80%; */
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
