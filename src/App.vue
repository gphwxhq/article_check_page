<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
   <router-view></router-view>
  <!-- <stuPage></stuPage> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import login from './components/login.vue'
// import stuPage from './components/stuPage.vue'

export default {
  name: 'App',
  // data(){
  //   return {
  //   user:null
  //   }
  // },
  components: {
    // HelloWorld,
    // login,
    // stuPage
  }
}
</script>

<style>
html,body,#app{
  /* position: relative; */
  height: 100%;
  background-color:#e0e0e0;
  margin: 0;
  padding:0;
  overflow-y:auto;
}
.main {
  margin-top: 43px;
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
</style>
