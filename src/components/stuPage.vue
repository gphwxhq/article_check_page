<template>
<div class="title">论文审核系统 学生端</div>
<div  class="main">
  <sideBar :mlist="['个人信息', '提交论文', '查看结果']"></sideBar>
  <van-cell-group style="flex:1">
    <van-cell title="单元格" value="内容" />
    <van-cell title="单元格" value="内容" label="描述信息" />
  </van-cell-group>
</div>
</template>
<script>
import sideBar from "./sideBar.vue";

export default {
  name: "stuPage",
  components: {
    sideBar,
  },
};
</script>
<style>
.main{
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  top: 2%;
  width: 95%;
  /* transform: translateY(-50%); */
  /* height: 100%; */
  margin: 0 auto;
  background-color: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.title{
  background-color: white;
  text-align: center;
  font-size: 30px;
  margin-bottom:10px;
}
</style>