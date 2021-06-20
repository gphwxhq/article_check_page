<template>
  <mtitle user="学生端" :userName="userName"/>
  <sideBar
    @change="handleChange"
    :mlist="sidebarList"
  ></sideBar>
  <router-view v-slot="{ Component }" @mdSidebar="modifySidebar">
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
  name: "stuPage",
  data() {
    return {
      user: null,
      userName:null,
      show: false,
      sidebarList:[{t:'个人信息',a:true},{t:'提交论文',a:false}, {t:'查看结果',a:false}]
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
      url: "/stuPage/init",
      params: {
        getstu: this.user,
      },
    })
      .then(function (res) {
        if (res.status == 200) {
          console.log(res.data);
          self.userName=res.data.userName;
          self.sidebarList[1].a=!res.data.handIn;
          self.sidebarList[2].a=res.data.handIn;
          console.log(self.sidebarList )
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
        self.$router.push({ name: "stu"+index });
        self.show = true;
      }, 500);
    },
    setName(name){
      if(name!=null)
        this.userName=name;
    },
    modifySidebar(index,value){
      this.sidebarList[index].a=value
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