<template>
    <sideBar :mlist="['个人信息','提交论文','查看结果']"></sideBar>
</template>
<script>
import sideBar from "./sideBar.vue"

export default {
    name: "stuPage",
  components: {
    sideBar
  },
}
</script>