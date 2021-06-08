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
</style>