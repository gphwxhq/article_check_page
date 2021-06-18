<template>
  <CellGroup title="基础信息">
    <Cell
      v-bind:title="key"
      v-bind:value="val"
      v-for="(val, key) in baseInfo"
      :key="val"
    />
  </CellGroup>
</template>
<script>
import { CellGroup, Cell } from "vant";
export default {
  name: "stuPage",
  data() {
    return {
      baseInfo: {
        姓名: 1,
        学号: 2,
        专业: 3,
        指导老师: 4,
      },
    };
  },
  components: {
    Cell,
    CellGroup,
  },
  mounted(){
    let self=this
      this.$http({
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
        method: "post",
        url: "/login",
        data: data,
      }).then(function (res) {
        if (res.status == 200) {
          console.log(res.data);
          self.baseInfo.姓名=res.data.Sname
          self.baseInfo.学号=res.data.Sno
          self.baseInfo.专业=res.data.Sdept
          self.baseInfo.老师=res.data.Teacher

        } else {
          self.$notify({ type: "danger", message: "网络连接错误" });
        }
      });
  }
};
</script>
<style>
.van-cell-group__title{
    text-align: left;
}
</style>