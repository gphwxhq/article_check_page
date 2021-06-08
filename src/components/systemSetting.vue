<template>
  <Cell center title="标题">
    <template #right-icon>
      <Switch v-model="checked" size="24" />
    </template>
  </Cell>
</template>
<script>
import { Cell, Switch } from "vant";
export default {
  name: "systemSetting",
  data() {
    return {
      checked: true,
    };
  },
  components: {
    Cell,
    Switch,
  },
};
</script>