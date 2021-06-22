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
      <Button type="primary" plain @click="onAdd">添加</Button>
      <Button type="primary" plain @click="selectAll">{{
        checkAll ? "取消全选" : "全选"
      }}</Button>
      <Button type="danger" plain @click="deleteSelect">删除</Button>
    </div>
    <List
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <Empty v-if="isEmpty" description="无内容" />
    <template v-if="!isEmpty">
      <CheckboxGroup v-model="checked" ref="checkboxGroup">
        <template v-for="(item, i) in state.list" :key="i">
          <!-- <div class="person_block"> -->
          <Cell :title="item.name">
            <template #icon>
              <Checkbox :name="i" />
            </template>
            <Button type="primary" @click="onModify(item)">修改</Button>
            <Button type="danger" @click="onDelete(i, item)">删除</Button>
          </Cell>
          <!-- </div> -->
        </template>
      </CheckboxGroup>
    </template>
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
        <Button round block type="danger" @click="showDialog = false"
          >取消</Button
        >
      </div>
    </Form>
    <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
  </Dialog>
  <Overlay :show="showOverlay">
    <div class="overlayWraper">
      <div>
        <Loading color="#1989fa" size="50px" vertical>加载中</Loading>
      </div>
    </div>
  </Overlay>
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
  Overlay,
  Loading,
  Empty,
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
      isEmpty: false,
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
    Overlay,
    Loading,
    Empty,
  },
  mounted() {
    let storage = window.localStorage;
    this.user = storage.getItem("user");
  },
  setup() {
    const showOverlay = ref(false);
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
      showOverlay,
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
        this.isEmpty=true
        return;
      }
      this.isEmpty=false
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
        url: "/adminPage/addPerson",
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
    onModify(item) {
      console.log(item);
      this.showOverlay = true;
      let self = this;
      this.$http({
        method: "get",
        url: "/adminPage/modifyPerson",
        params: {
          user: item.no,
        },
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);
            self.formState.no = res.data.userNO;
            self.formState.name = res.data.userName;
            self.formState.password = res.data.password;
            self.formState.roleChecked = res.data.role;

            self.dialogTitle = item.name;
            self.showOverlay = false;
            self.showDialog = true;
          } else {
            self.$notify({ type: "danger", message: "网络连接错误" });
          }
        })
        .catch((err) => {
          console.log("rejected", err);
          self.$notify({ type: "danger", message: "网络连接错误" });
          // self.isError = true;
        });
    },
    onDelete(index, item) {
      console.log(index, item);
      Dialog.confirm({
        title: "删除确认",
        message: "确认要删除" + item.name + "吗？",
      })
        .then(() => {
          let self = this;
          this.$http({
            // headers: {
            //   "Content-Type": "application/x-www-form-urlencoded",
            // },
            method: "get",
            url: "/adminPage/deletePerson",
            params: {
              user: [item.no],
            },
          })
            .then(function (res) {
              if (res.status == 200) {
                console.log(res.data);
                if (res.data.success) {
                  self.$notify({ type: "success", message: "删除成功" });
                  self.state.list.splice(index, 1);
                }
              } else {
                self.$notify({ type: "danger", message: "网络连接错误" });
              }
            })
            .catch((err) => {
              console.log("rejected", err);
              self.$notify({ type: "danger", message: "网络连接错误" });
              // self.isError = true;
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    selectAll() {
      if (this.$refs.checkboxGroup==null)
        return
      this.$refs.checkboxGroup.toggleAll(!this.checkAll);
      this.checkAll = !this.checkAll;
    },
    deleteSelect() {
      let noList = [];
      for (let i in this.checked) {
        noList.push(this.state.list[i].no);
      }
      console.log(noList);
      Dialog.confirm({
        title: "删除确认",
        message: "确认要删除这些人员吗",
      })
        .then(() => {
          let self = this;
          this.$http({
            method: "get",
            url: "/adminPage/deletePerson",
            params: {
              user: noList,
            },
          })
            .then(function (res) {
              if (res.status == 200) {
                console.log(res.data);
                if (res.data.success) {
                  self.$notify({ type: "success", message: "删除成功" });
                  for (let i = this.checked.length - 1; i >= 0; i--) {
                    self.state.list.splice(this.checked[i], 1);
                  }
                  self.$refs.checkboxGroup.toggleAll(false);
                  self.checkAll = false;
                  // this.onLoad();
                }
              } else {
                self.$notify({ type: "danger", message: "网络连接错误" });
              }
            })
            .catch((err) => {
              console.log("rejected", err);
              self.$notify({ type: "danger", message: "网络连接错误" });
              // self.isError = true;
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    onSearch(key) {
      console.log(key);
      this.isEmpty=false
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
.overlayWraper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.overlayWraper div {
  display: flex;
  justify-content: center;
  width: 120px;
  height: 120px;
  background-color: #fff;
}
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