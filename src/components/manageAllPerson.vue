<template>
  <div id="manageAllPerson">
    <Search
      v-model="searchValue"
      placeholder="请输入要搜索的人员"
      input-align="center"
    />
    <!-- <div> -->
    <div class="person_button_group">
      <Button type="primary" @click="onAdd">添加</Button>
      <Button type="primary" @click="selectAll">{{
        checkAll ? "取消全选" : "全选"
      }}</Button>
      <Button type="danger" @click="deleteSelect">删除</Button>
    </div>
    <List
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CheckboxGroup v-model="checked" ref="checkboxGroup">
        <template v-for="(item, i) in state.list" :key="item">
          <!-- <div class="person_block"> -->
          <Cell :title="item">
            <template #icon>
              <Checkbox :name="i" />
            </template>
            <Button type="primary" @click="onModify(i)">修改</Button>
            <Button type="danger" @click="onDelete([i])">删除</Button>
          </Cell>
          <!-- </div> -->
        </template>
      </CheckboxGroup>
    </List>
  </div>
</template>
<script>
import {
  Search,
  List,
  Cell,
  Button,
  Dialog,
  Checkbox,
  CheckboxGroup,
} from "vant";
import { ref, reactive } from "vue";
export default {
  name: "manageAllPerson",
  data() {
    return {
      checked: [],
      checkAll: false,
    };
  },
  components: {
    Search,
    List,
    Cell,
    Button,
    Checkbox,
    CheckboxGroup,
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
    onAdd() {},
    onModify(a) {
      console.log(a);
    },
    onDelete(item) {
      Dialog.confirm({
        title: "删除确认",
        message: "弹窗内容",
      })
        .then(() => {
          this.state.list.splice(item, 1);
        })
        .catch(() => {
          // on cancel
        });
    },
    selectAll() {
      this.$refs.checkboxGroup.toggleAll(!this.checkAll);
      this.checkAll = !this.checkAll;
    },
    deleteSelect() {
      for (let i = this.checked.length - 1; i >= 0; i--) {
        this.state.list.splice(this.checked[i], 1);
      }
      this.$refs.checkboxGroup.toggleAll(false);
      this.checkAll = false;
      this.onLoad();
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
.person_button_group {
  text-align: right;
}
#manageAllPerson .van-button--normal{
  margin-left: 5px;
}
</style>