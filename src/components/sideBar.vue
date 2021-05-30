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

</style>