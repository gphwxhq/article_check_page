<template>
  <van-loading size="24px" vertical v-if="isLoading && !isError"
    >加载中...</van-loading
  >
  <van-empty description="加载错误" v-if="isError" />
  <van-cell-group title="基础信息" v-if="!isLoading && !isError">
    <van-cell
      v-bind:title="key"
      v-bind:value="val"
      v-for="(val, key) in baseInfo"
      :key="val"
    />
  </van-cell-group>
</template>
<script>
// import { CellGroup, Cell } from "vant";
export default {
  name: "teacherBaseInfo",
  data() {
    return {
      baseInfo: {
        // 姓名: 1,
        // 学号: 2,
        // 专业: 3,
        // 指导老师: 4,
      },
      isLoading: true,
      isError: false,
    };
  },
  emits: ["mdSidebar"],
  components: {

  },
  mounted() {
    let storage = window.localStorage;
    this.user = storage.getItem("user");
    let self = this;
    this.$http({
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
      method: "get",
      url: "/teacherPage",
      params: {
        'user': this.user,
      },
    })
      .then(function (res) {
        if (res.status == 200) {
          console.log(res.data);
        //   self.baseInfo.姓名 = res.data.Sname;
        //   self.baseInfo.学号 = res.data.Sno;
        //   self.baseInfo.专业 = res.data.Sdept;
        //   self.baseInfo.指导老师 = res.data.Teacher;
          // self.$emit("name", res.data.Sname);
          self.isLoading = false;
        } else {
          self.$notify({ type: "danger", message: "网络连接错误" });
          self.isError=true
        }
      })
      .catch((err) => {
        console.log("rejected", err);
        self.$notify({ type: "danger", message: "网络连接错误" });
        self.isError=true
      });
  },
};
</script>
<style>
/* .van-cell-group__title {
  text-align: left;
} */
</style>