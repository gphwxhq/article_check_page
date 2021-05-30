<template>
  <van-sidebar v-model="activeKey" @change="onChange">
    <div style="color:grey;padding-bottom:5px">导航</div>
    <van-sidebar-item  v-bind:title="item"  v-for="item in mlist" :key="item"/>
  </van-sidebar>
</template>
<script>
import { Notify } from "vant";

export default {
  name: "sideBar",
  props:['mlist'],
  data() {
    return {
      activeKey: 0,
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
  },
};
</script>
<style>
#app {
  padding: 10px;
  border-radius: 10px;
  position: relative;
  top:2%;
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
</style>