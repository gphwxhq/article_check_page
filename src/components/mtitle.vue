<template>
  <div class="title">
    <img
      style="width: 25px; height: 25px; padding-right: 5px"
      src="../assets/logo.png"
    />
    <div style="display: inline-block;font-size: 25px;font-family:'微软雅黑';">论文审核系统</div>
    <div class="ltitle">{{user}}</div>
    <div class="rtitle">欢迎您,{{ user }}</div>
  </div>
</template>
<script>
export default {
  name: "mtitle",
  props: ["user"],
};
</script>
<style>
.title {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgb(54, 65, 80);
  /* padding-right: 50px; */
  /* text-align: center; */
  /* width: 100%; */
  padding: 5px;
  /* margin-bottom: 10px; */
  color: white;
}
.ltitle {
  padding-left: 10px;
  display: inline-block;
  font-size: 20px;
}
.rtitle {
  padding-top: 9px;
  font-size: 15px;
  float: right;
  color: rgb(237, 243, 244);
}
</style>