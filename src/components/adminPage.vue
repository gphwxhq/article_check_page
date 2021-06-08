<template>
  <!-- <div class="title">
    <img
      style="width: 25px; height: 25px; padding-right: 5px"
      src="../assets/logo.png"
    />
    <div style="display: inline-block">论文审核系统</div>
    <div class="ltitle">管理端</div>
    <div class="rtitle">欢迎您,{{ user }}</div>
  </div> -->
  <mtitle user="管理端"></mtitle>
  <sideBar
    @change="handleChange"
    :mlist="['人员管理', '论文信息管理', '系统设置']"
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
  name: "adminPage",
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
        self.$router.push({ name: "admin"+index });
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