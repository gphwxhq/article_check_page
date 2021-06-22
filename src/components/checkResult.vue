<template>
  <!-- <CellGroup title="流程"> -->
  <van-loading size="24px" vertical v-if="isLoading && !isError"
    >加载中...</van-loading
  >
  <van-empty description="加载错误" v-if="isError" />
  <template v-if="!isLoading && !isError">
    <Steps :active="active">
      <Step>提交论文</Step>
      <Step>导师审阅</Step>
      <Step>完成</Step>
    </Steps>
    <!-- </CellGroup> -->
    <van-cell-group title="论文信息">
      <van-cell
        v-bind:title="key"
        v-bind:value="val"
        v-for="(val, key) in articleInfo"
        :key="val"
      />
    </van-cell-group>
  </template>
</template>
<script>
import { Step, Steps } from "vant";
export default {
  name: "checkResult",
  data() {
    return {
      isLoading:true,
      isError:false,
      active: 0,
      articleInfo: {
        论文编号: 1,
        标题: 2,
        审核状态: 3,
        审核结果: 4,
      },
    };
  },
  emits: [ "mdSidebar"],
  components: {
    Steps,
    Step,
  },
  mounted() {
    // this.$emit("name", null);
    let storage = window.localStorage;
    this.user = storage.getItem("user");
    let self = this;
    this.$http({
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
      method: "get",
      url: "/stuPage/checkResult",
      params: {
        'user': this.user,
      },
    })
      .then(function (res) {
        if (res.status == 200) {
          self.isLoading=false
          console.log(res.data);
          self.articleInfo.论文编号 = res.data.PaperNo;
          self.articleInfo.标题 = res.data.Title;
          self.articleInfo.审核状态 = res.data.Checkin;
          self.articleInfo.审核结果 = res.data.Status;
          if (
            res.data.Status == "通过" ||
            res.data.Status == "不通过" ||
            res.data.Checkin == "不通过"
          )
            self.active = 2;
          else if (res.data.Checkin == "通过") self.active = 1;
        } else {
          self.$notify({ type: "danger", message: "网络连接错误" });
        }
      })
      .catch((err) => {
        console.log("rejected", err);
        self.$notify({ type: "danger", message: "网络连接错误" });
      });
  },
};
</script>
<style>
.van-cell-group__title {
  text-align: left;
}
</style>