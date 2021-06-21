<template>
  <div id="manageAllPerson">
    <Search
      v-model="searchValue"
      placeholder="请输入要搜索的人员"
      input-align="center"
      @search="onSearch"
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
        <template v-for="(item, i) in state.list" :key="i">
          <!-- <div class="person_block"> -->
          <Cell :title="item.name">
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

  <Dialog
    v-model:show="showDialog"
    :title="dialogTitle"
    :show-confirm-button="false"
    confirm-button-text="提交"
  >
    <Form @submit="onSubmit">
      <Field name="role" label="单选框">
        <template #input>
          <RadioGroup v-model="formState.roleChecked" direction="horizontal">
            <Radio name="学生">学生</Radio>
            <Radio name="教师">教师</Radio>
          </RadioGroup>
        </template>
      </Field>
      <Field
        v-model="formState.no"
        name="no"
        label="编号"
        placeholder="编号"
        :rules="[{ required: true, message: '请填写编号' }]"
      />
      <Field
        v-model="formState.name"
        name="name"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <template v-if="formState.roleChecked == '学生'">
        <Field
          v-model="formState.dept"
          name="dept"
          label="院系"
          placeholder="院系"
          :rules="[{ required: true, message: '请填写院系' }]"
        />
      </template>
      <template v-else>
        <Field
          v-model="formState.academy"
          name="academy"
          label="学院"
          placeholder="学院"
          :rules="[{ required: true, message: '请填写学院' }]"
        />
        <Field
          v-model="formState.job"
          name="job"
          label="职务"
          placeholder="职务"
          :rules="[{ required: true, message: '请填写职务' }]"
        />
      </template>

      <Field
        v-model="formState.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <Button round block type="success" native-type="submit">提交</Button>
        <Button round block type="danger" @click="cancelSubmit">取消</Button>
      </div>
    </Form>
    <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
  </Dialog>
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
  Form,
  Field,
  Radio,
  RadioGroup,
} from "vant";
import { ref, reactive } from "vue";
export default {
  name: "manageAllPerson",
  data() {
    return {
      page: 1,
      result: [],
      checked: [],
      checkAll: false,
      dialogTitle: "",
    };
  },
  components: {
    Search,
    List,
    Cell,
    Button,
    Checkbox,
    CheckboxGroup,
    Form,
    Field,
    Dialog: Dialog.Component,
    Radio,
    RadioGroup,
  },
  mounted() {
    let storage = window.localStorage;
    this.user = storage.getItem("user");
  },
  setup() {
    const showDialog = ref(false);
    const searchValue = ref("");
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });
    const formState = reactive({
      no: "",
      name: "",
      role: "",
      job: "",
      academy: "",
      password: "",
      dept: "",
      roleChecked: ref("学生"),
    });
    return {
      searchValue,
      state,
      showDialog,
      formState,
    };
  },
  methods: {
    onLoad() {
      // state.loading=true
      console.log(1);
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      // for (let i = 0; i < 20; i++) {
      //   state.list.push(state.list.length + 1);
      // }
      if (this.result.length == 0) {
        this.state.loading = false;
        return;
      }
      if (this.result.length >= this.page * 10) {
        for (let i = (this.page - 1) * 10; i < this.page * 10; i++)
          this.state.list.push(this.result[i]);
        this.page++;
      } else {
        for (let i = (this.page - 1) * 10; i < this.result.length; i++)
          this.state.list.push(this.result[i]);
        this.state.finished = true;
      }

      // 加载状态结束
      console.log(this.state.list);
      this.state.loading = false;

      // 数据全部加载完成
      // if (state.list.length >= 40) {
      //   state.finished = true;
      // }
      // }, 1000);
    },
    onAdd() {
      this.dialogTitle = "添加人员";
      this.showDialog = true;
    },
    onSubmit(values) {
      console.log("submit", values);

      let self = this;
      this.$http({
        method: "post",
        url: "/adminPage/addParson",
        data: values,
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);
            if (res.data.success) {
              self.$notify({ type: "success", message: "添加成功" });
            } else {
              self.$notify({ type: "danger", message: "网络连接错误" });
            }
          } else {
            self.$notify({ type: "danger", message: "网络连接错误" });
          }
        })
        .catch((err) => {
          console.log("rejected", err);
          self.$notify({ type: "danger", message: "网络连接错误" });
        });
    },
    cancelSubmit(){
      this.showDialog = false;
    },
    onModify(a) {
      console.log(a);

      this.$http({
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
        method: "get",
        url: "/adminPage/addPerson",
        params: {
          user: this.user,
        },
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);
            // if (res.data.role == "学生") {
            // }
          } else {
            self.$notify({ type: "danger", message: "网络连接错误" });
          }
        })
        .catch((err) => {
          console.log("rejected", err);
          self.$notify({ type: "danger", message: "网络连接错误" });
          self.isError = true;
        });

      this.dialogTitle = "添加人员";
      this.showDialog = true;
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
    onSearch(key) {
      console.log(key);
      this.state.loading = true;
      let self = this;
      this.$http({
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
        method: "get",
        url: "/adminPage",
        params: {
          keyWords: key,
        },
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);
            self.result = res.data.res;
            // self.$emit("name", res.data.Sname);
            // self.state.loading = false;
            self.state.list = [];
            self.state.finished = false;
            self.page = 1;
            self.onLoad();
          } else {
            self.$notify({ type: "danger", message: "网络连接错误" });
            // self.isError = true;
          }
        })
        .catch((err) => {
          console.log("rejected", err);
          self.$notify({ type: "danger", message: "网络连接错误" });
          // self.isError=true
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
.person_button_group {
  background: white;
  position: sticky;
  top: 97px;
  z-index: 1;
  text-align: right;
}
#manageAllPerson .van-button--normal {
  margin-left: 5px;
}
</style>