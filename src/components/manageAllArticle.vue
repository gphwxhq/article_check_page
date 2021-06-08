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
    <template v-for="(item, i) in state.list" :key="item">
      <Cell :title="item"
        ><Button type="primary" @click="onModify(i)">修改</Button
        ><Button type="danger" @click="onDelete(i)">删除</Button></Cell
      >
    </template>
  </List>
  <!-- </div> -->
</template>
<script>
import { Search, List, Cell, Button, Dialog } from "vant";
import { ref, reactive } from "vue";
export default {
  name: "manageAllArticle",
  components: {
    Search,
    List,
    Cell,
    Button,
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
        for (let i = 0; i < 20; i++) {
          state.list.push(state.list.length + 1);
        }

        // 加载状态结束
        state.loading = false;

        // 数据全部加载完成
        if (state.list.length >= 40) {
          state.finished = true;
        }
      }, 1000);
    };

    return {
      searchValue,
      state,
      onLoad,
    };
  },
  methods: {
    onModify(a) {
      console.log(a);
    },
    onDelete(a) {
      Dialog.confirm({
        title: "删除确认",
        message: "弹窗内容",
      })
        .then(() => {
          this.state.list.splice(a, 1);
        })
        .catch(() => {
          // on cancel
        });
    },
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