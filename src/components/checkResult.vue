<template>
  <CellGroup title="流程">
    <Steps :active="active">
      <Step>提交论文</Step>
      <Step>导师审阅</Step>
      <Step>完成</Step>
    </Steps>
  </CellGroup>
  <CellGroup title="基础信息">
    <Cell
      v-bind:title="key"
      v-bind:value="val"
      v-for="(val, key) in articleInfo"
      :key="val"
    />
  </CellGroup>
</template>
<script>
import { CellGroup, Cell, Step, Steps } from "vant";
export default {
  name: "checkResult",
  data() {
    return {
      active: 0,
      articleInfo: {
        论文编号: 1,
        标题: 2,
        审核状态: 3,
        审核结果: 4,
      },
    };
  },
  components: {
    CellGroup,
    Cell,
    Steps,
    Step,
  },
};
</script>