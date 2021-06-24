<template>
  <mtitle user="教师端" :userName="userName"/>
  <sideBar
    @change="handleChange"
    :mlist="sideBarList"
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
      userName:null,
      role:null,
      user: null,
      show: false,
      sideBarList:[{'t':'个人信息','a':true},{'t': '论文评审','a':true}]
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
    this.userName=this.user
    console.log(this.user);
    // this.$router.push({ path: "baseInfo" });
    this.show = true;

    let self=this
    this.$http({
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
      method: "get",
      url: "/teacherPage/init",
      params: {
        'user': this.user,
      },
    })
      .then(function (res) {
        if (res.status == 200) {
          console.log(res.data);
          self.userName=res.data.tname;
          self.role=res.data.role;
          storage["teacherRole"]=res.data.role;
          storage["teacherDept"]=res.data.dept;
          // if(res.data.role=='指导教师')
          //   self.sideBarList.push({'t': '学生管理','a':true})
          // self.sideBarList.push({'t': '论文评审','a':true})
        } else {
          self.$notify({ type: "danger", message: "网络连接错误" });
        }
      })
      .catch((err) => {
        console.log("rejected", err);
        self.$notify({ type: "danger", message: "网络连接错误" });
      });
  },
  methods:{
      handleChange(index) {
      this.show = false;
      let self = this;
      setTimeout(function () {
        self.$router.push({ name: "teacher"+self.sideBarList[index].t });
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