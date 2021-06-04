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
  data(){
    return {
    user:null
    }
  },
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
  overflow:hidden;
}
</style>
