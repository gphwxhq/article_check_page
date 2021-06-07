<template>
  <Search
    v-model="searchValue"
    placeholder="请输入要搜索的人员"
    input-align="center"
  />
  <!-- <div> -->
  <List
    v-model:loading="state.loading"
    :finished="state.finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
  <template v-for="item in state.list" :key="item">
    <Cell  :title="item"><Button>111</Button></Cell>
    
  </template>
  </List>
  <!-- </div> -->
</template>
<script>
import { Search, List, Cell,Button } from "vant";
import { ref, reactive } from "vue";
export default {
  name: "manageAllPerson",
  components: {
    Search,
    List,
    Cell,
    Button
  },
  setup() {
    const searchValue = ref("");
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });
    const onLoad = () => {
      // state.loading=true
      console.log(1);
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          state.list.push(state.list.length + 1);
        }

        // 加载状态结束
        state.loading = false;

        // 数据全部加载完成
        if (state.list.length >= 40) {
          state.finished = true;
        }
      }, 5000);
    };

    return {
      searchValue,
      state,
      onLoad,
    };
  },
};
</script>
<style>
.van-search {
  position: sticky;
  top: 43px;
  z-index: 1;
}
</style>