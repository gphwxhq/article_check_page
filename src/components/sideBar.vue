<template>
<div class="msidebar">
  <van-sidebar  v-model="activeKey" @change="onChange">
    <!-- <div class="title">导航</div> -->
    <van-sidebar-item v-bind:title="item" v-for="item in mlist" :key="item" />
  </van-sidebar>
</div>
</template>
<script>
// import { Notify } from "vant";

export default {
  name: "sideBar",
  props: ["mlist"],
  data() {
    return {
      activeKey: 0,
    };
  },
  methods: {
    onChange(index) {
      this.$emit("change", index);
      this.$notify({ type: "primary", message: index });
    },
  },
};
</script>
<style>
.msidebar .title {
  color: white;
 margin: 0;
  background-color: rgb(54, 65, 80)
}
.msidebar {
  position: fixed;
  background-color: rgb(54, 65, 80);
  height: 100%;
}
.van-sidebar-item{
  background-color: rgb(54, 65, 80);
  color:rgb(167, 176, 192);
}
.van-sidebar-item--select{
  background-color: rgb(54, 198, 211);
  color: white;
}
.van-sidebar-item--select::before {
  display: none;
}
</style>