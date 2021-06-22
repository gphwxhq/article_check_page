<template>
<van-cell-group title="基础设置">
  <van-cell title="标题">
    <template #right-icon>
      <Switch v-model="checked" size="24" />
    </template>
  </van-cell>
</van-cell-group>
</template>
<script>
import {Switch } from "vant";
export default {
  name: "systemSetting",
  data() {
    return {
      checked: true,
    };
  },
  components: {
    Switch,
  },
};
</script>