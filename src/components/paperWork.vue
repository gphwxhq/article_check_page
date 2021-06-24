<template>
  <div id="manageAllArticle">
    <Search
      v-model="searchValue"
      placeholder="请输入要搜索的标题"
      input-align="center"
      @search="onSearch"
    />
    <!-- <div> -->
    <div class="button_group">
      <!-- <van-button type="primary" plain @click="onAdd">添加</van-button> -->
      <van-button type="primary" plain @click="selectAll">{{
        checkAll ? "取消全选" : "全选"
      }}</van-button>
      <!-- <van-button type="danger" plain @click="deleteSelect">删除</van-button> -->
    </div>
    <List
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-empty v-if="isEmpty" description="无内容" />
      <template v-if="!isEmpty">
        <van-checkbox-group v-model="checked" ref="checkboxGroup">
          <template v-for="(item, i) in state.list" :key="i">
            <!-- <div class="person_block"> -->
            <van-cell :title="item.name">
              <template #icon>
                <van-checkbox :name="i" />
              </template>
              <van-button type="primary" @click="onModify(item)"
                >修改</van-button
              >
              <!-- <van-button type="danger" @click="onDelete(i, item)"
                >删除</van-button
              > -->
            </van-cell>
            <!-- </div> -->
          </template>
        </van-checkbox-group>
      </template>
    </List>
  </div>

  <Dialog
    v-model:show="showDialog"
    :title="dialogTitle"
    :show-cancel-button="true"
    confirm-button-text="提交"
  >
    <!-- <van-form @submit="onSubmit">
      <van-field
        v-model="formState.paperNo"
        name="no"
        label="编号"
        placeholder="编号"
        :rules="[{ required: true, message: '请填写编号' }]"
      />
      <van-field
        v-model="formState.title"
        name="title"
        label="标题"
        placeholder="标题"
        :rules="[{ required: true, message: '请填写标题' }]"
      />
      <van-field
        v-model="formState.num"
        name="num"
        label="字数"
        placeholder="字数"
        :rules="[{ required: true, message: '请填写字数' }]"
      />
      <van-field
        v-model="formState.summary"
        name="summary"
        label="摘要"
        placeholder="摘要"
        :rules="[{ required: true, message: '请填写摘要' }]"
      />
      <van-field
        v-model="formState.keyword"
        name="keyword"
        label="关键词"
        placeholder="关键词"
        :rules="[{ required: true, message: '请填写关键词' }]"
      />
      <template v-if="submitMode == 0">
        <van-field
          v-model="formState.sno"
          name="sno"
          label="学号"
          placeholder="学号"
          :rules="[
            { required: true, message: '请填写学号' },
            { pattern: /^\d{6}$/, message: '请输入6位数字' },
          ]"
        />
        <van-field
          v-model="formState.tno"
          name="tno"
          label="教师编号"
          placeholder="教师编号"
          :rules="[
            { required: true, message: '请填写教师编号' },
            { pattern: /^\d{8}$/, message: '请输入8位数字' },
          ]"
        />
      </template>
      <div style="margin: 16px">
        <van-button round block type="success" native-type="submit"
          >提交</van-button
        >
        <van-button round block type="danger" @click="showDialog = false"
          >取消</van-button
        >
      </div>-->
      <DropdownMenu :overlay="false" z-index="3000">
        <DropdownItem
          v-model="dropDownState.value"
          :options="option"
          teleport="body"
        />
      </DropdownMenu>
    <!-- </van-form>  -->
    <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
  </Dialog>
  <loading-overlay :show="showOverlay" />
</template>
<script>
import { Search, List, Dialog,DropdownMenu,DropdownItem } from "vant";
import loadingOverlay from "./loadingOverlay.vue";
import { ref, reactive } from "vue";
export default {
  name: "paperWork",
  data() {
    return {
      // queryNo: "",
      // submitMode: 0,
      page: 1,
      result: [],
      checked: [],
      checkAll: false,
      dialogTitle: "",
      isEmpty: false,
    };
  },
  components: {
    DropdownItem,
    DropdownMenu,
    Search,
    List,
    Dialog: Dialog.Component,
    loadingOverlay,
  },
  mounted() {
    let storage = window.localStorage;
    this.user = storage.getItem("user");
    this.role=storage.getItem("teacherRole")
    this.dept=storage.getItem("teacherDept")
  },
  setup() {
    const dropDownState = reactive({
      value: 0,
    });
    const option = [{ text: "选择导师", value: 0 }];
    const showOverlay = ref(false);
    const showDialog = ref(false);
    const searchValue = ref("");
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });
    // const formState = reactive({
    //   paperNo: "",
    //   title: "",
    //   num: "",
    //   summary: "",
    //   sno: "",
    //   tno: "",
    //   keyword: "",
    // });
    return {
      dropDownState,
      option,
      searchValue,
      state,
      showDialog,
      // formState,
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
        this.isEmpty = true;
        return;
      }
      this.isEmpty = false;
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
    // onAdd() {
    //   this.dialogTitle = "添加论文";
    //   this.submitMode = 0;
    //   this.showDialog = true;
    // },
    // onSubmit(values) {
    //   values["handle"] = this.submitMode;
    //   if (this.submitMode == 1) {
    //     values["newno"] = values["no"];
    //     values["no"] = this.queryNo;
    //   }
    //   console.log("submit", values);
    //   let self = this;
    //   this.$http({
    //     method: "post",
    //     url: "/teacherPage/addPaper",
    //     data: values,
    //   })
    //     .then(function (res) {
    //       if (res.status == 200) {
    //         console.log(res.data);
    //         if (res.data.success) {
    //           self.$notify({ type: "success", message: "添加成功" });
    //         } else {
    //           self.$notify({ type: "danger", message: "网络连接错误" });
    //         }
    //       } else {
    //         self.$notify({ type: "danger", message: "网络连接错误" });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("rejected", err);
    //       self.$notify({ type: "danger", message: "网络连接错误" });
    //     });
    // },
    onModify(item) {
      console.log(item);
      this.queryNo = item.no;
      this.showOverlay = true;
      this.submitMode = 1;
      let self = this;
      this.$http({
        method: "get",
        url: "/teacherPage/modifyPaper",
        params: {
          user: item.no,
        },
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);
            //       paperNo: "",
            // title: "",
            // num: "",
            // summary: "",
            // sno: "",
            // tno: "",
            self.formState.paperNo = res.data.paperNo;
            self.formState.title = res.data.title;
            self.formState.summary = res.data.summary;
            self.formState.num = res.data.num;
            self.formState.sno = res.data.sno;
            self.formState.tno = res.data.tno;
            self.formState.keyword = res.data.keyword;

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
    // onDelete(index, item) {
    //   console.log(index, item);
    //   Dialog.confirm({
    //     title: "删除确认",
    //     message: "确认要删除" + item.name + "吗？",
    //   })
    //     .then(() => {
    //       let self = this;
    //       this.$http({
    //         // headers: {
    //         //   "Content-Type": "application/x-www-form-urlencoded",
    //         // },
    //         method: "post",
    //         url: "/teacherPage/deletePaper",
    //         data: {
    //           user: [item.no],
    //         },
    //       })
    //         .then(function (res) {
    //           if (res.status == 200) {
    //             console.log(res.data);
    //             if (res.data.success) {
    //               self.$notify({ type: "success", message: "删除成功" });
    //               self.state.list.splice(index, 1);
    //             }
    //           } else {
    //             self.$notify({ type: "danger", message: "网络连接错误" });
    //           }
    //         })
    //         .catch((err) => {
    //           console.log("rejected", err);
    //           self.$notify({ type: "danger", message: "网络连接错误" });
    //           // self.isError = true;
    //         });
    //     })
    //     .catch(() => {
    //       // on cancel
    //     });
    // },
    selectAll() {
      if (this.$refs.checkboxGroup == null) return;
      this.$refs.checkboxGroup.toggleAll(!this.checkAll);
      this.checkAll = !this.checkAll;
    },
    deleteSelect() {
      if (this.checked.length == 0) return;
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
            method: "post",
            url: "/teacherPage/deletePaper",
            data: {
              user: noList,
            },
          })
            .then(function (res) {
              if (res.status == 200) {
                console.log(res.data);
                if (res.data.success) {
                  self.$notify({ type: "success", message: "删除成功" });
                  for (let i = self.checked.length - 1; i >= 0; i--) {
                    self.state.list.splice(self.checked[i], 1);
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
      let url=null
      let params=null
      if(this.role=="指导老师"){
        url="zcheckArticle"
        params={
          keyWords: key,
          tno:this.user
        }
      }
      else if(this.role=="专家"){
        url="pcheckArticle"
        params={
          keyWords: key,
          tno:this.user
        }
      }
      else{
        params={
          keyWords: key,
          dept:this.dept
        }
        url="mcheckArticle"
      }
        
      console.log(key);
      this.isEmpty = false;
      this.state.loading = true;
      let self = this;
      this.$http({
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
        method: "get",
        url: url,
        params: params
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
.van-dropdown-item--down {
  width: 320px;
  margin: 0 auto;
}
</style>