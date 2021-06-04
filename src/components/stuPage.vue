<template>
<!-- <div class="container"> -->
<div class="title">论文审核系统 学生端</div>
<div  class="main">
  <sideBar @change="handleChange" :mlist="['个人信息', '提交论文', '查看结果']"></sideBar>
  <van-cell-group v-if="type==0" style="width:80%">
    <van-cell title="单元格" value="内容" />
    <van-cell title="单元格" value="内容" label="描述信息" />
  </van-cell-group>
  <van-cell-group v-else-if="type==1" style="width:80%">
    <van-cell title="单元格2" value="内容" />
    <van-cell title="单元格2" value="内容" label="描述信息" />
  </van-cell-group>
  <van-cell-group v-else style="width:80%">
    <van-cell title="单元格3" value="内容" />
    <van-cell title="单元格3" value="内容" label="描述信息" />
  </van-cell-group>
</div>
<!-- </div> -->
</template>
<script>
import sideBar from "./sideBar.vue";

export default {
  name: "stuPage",
  data(){
    return{

      type:0
    }
  },
  components: {
    sideBar,
  },
  mounted(){
    console.log(this.$route.query)
    console.log(this.$root.user)
  },
  methods:{
    handleChange(index){
      this.type=index
    }
  }
};
</script>
<style>
/* #app {
  width: 100%;
  height: 100%;
  margin-top: 60px;
} */
.main{
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  top: 2%;
  width: 95%;
  /* transform: translateY(-50%); */
  /* height: 100%; */
  margin: 0 auto;
  background-color: white;
  text-align: center;
  /* margin-top: 60px; */
}
.title{
  background-color: rgb(0, 166, 207);
  /* padding-right: 50px; */
  text-align: center;
  font-size: 30px;
  margin-bottom:10px;
  color:white;
}
</style>