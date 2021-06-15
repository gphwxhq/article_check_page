<template>
<CellGroup title="基础设置">
  <Cell title="标题">
    <template #right-icon>
      <Switch v-model="checked" size="24" />
    </template>
  </Cell>
</CellGroup>
</template>
<script>
import { Cell,CellGroup, Switch } from "vant";
export default {
  name: "systemSetting",
  data() {
    return {
      checked: true,
    };
  },
  components: {
    Cell,
    CellGroup,
    Switch,
  },
};
</script>