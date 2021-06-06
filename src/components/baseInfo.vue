<template>
  <CellGroup title="基础信息">
    <Cell
      v-bind:title="key"
      v-bind:value="val"
      v-for="(val, key) in baseInfo"
      :key="val"
    />
  </CellGroup>
</template>
<script>
import { CellGroup, Cell } from "vant";
export default {
  name: "stuPage",
  data() {
    return {
      baseInfo: {
        姓名: 1,
        学号: 2,
        专业: 3,
        指导老师: 4,
      },
    };
  },
  components: {
    Cell,
    CellGroup,
  },
};
</script>
<style>
.van-cell-group__title{
    text-align: left;
}
</style>