<template>
  <mtitle user="教师端"/>
  <sideBar
    @change="handleChange"
    :mlist="['个人信息', '学生管理', '论文评审']"
  ></sideBar>
  <router-view v-slot="{ Component }">
    <transition name="van-fade">
      <div v-show="show" class="main">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<script>
import sideBar from "./sideBar.vue";
import mtitle from "./mtitle.vue";
export default {
  name: "teacherPage",
  data() {
    return {
      user: null,
      show: false,
    };
  },
  components: {
    sideBar,
    mtitle
  },
  mounted() {
    // console.log(this.$route.query);
    // console.log(this.$root.user);
    let storage = window.localStorage;
    this.user = storage.getItem("user");
    console.log(this.user);
    // this.$router.push({ path: "baseInfo" });
    this.show = true;
  },
  methods:{
      handleChange(index) {
      this.show = false;
      let self = this;
      setTimeout(function () {
        self.$router.push({ name: "teacher"+index });
        self.show = true;
      }, 500);
    },
  }
    
};
</script>
<style>
/* #app {
  width: 100%;
  height: 100%;
  margin-top: 60px;
} */
.main {
  margin-left: 90px;
  margin-right: 10px;
  padding: 10px;
  border-radius: 10px;
  /* display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center; */
  /* top: 2%; */
  /* width: 95%; */
  /* transform: translateY(-50%); */
  /* height: 100%; */
  /* margin: 0 auto; */
  background-color: white;
  text-align: center;
  /* margin-top: 60px; */
}
.title {
  background-color: rgb(54, 65, 80);
  /* padding-right: 50px; */
  /* text-align: center; */
  /* width: 100%; */
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 25px;
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
/* .mtb {
  border: solid 1px;
  width: 100%;
  border-collapse: collapse;
}
tr {
  border-bottom: 1px solid;
}
td {
  border-left: 1px solid;
}
.gcol {
  background-color: rgb(237, 243, 244);
  /* width: 100px; 
  width: 10%;
  padding-right: 5px;
  text-align: right;
}
.gitem {
  /* width: 200px; 
  width: 90%;
  text-align: left;
  padding-left: 5px;
}
.van-cell-group__title {
  text-align: left;
} */
</style>