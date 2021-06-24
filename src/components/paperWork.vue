<template>
  <div id="manageAllArticle">
    <Search
      v-model="searchValue"
      placeholder="请输入要搜索的标题"
      input-align="center"
      @search="onSearch"
    />
    <!-- <div> -->
    <!-- <div class="button_group"> -->
      <!-- <van-button type="primary" plain @click="onAdd">添加</van-button> -->
      <!-- <van-button type="primary" plain @click="selectAll">{{
        checkAll ? "取消全选" : "全选"
      }}</van-button>
      <van-button
        v-if="role == '教学秘书'"
        type="primary"
        plain
        @click="modifySelect"
        >分配专家</van-button
      > -->
      <!-- <van-button type="danger" plain @click="deleteSelect">删除</van-button> -->
    <!-- </div> -->
    <List
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-empty v-if="isEmpty" description="无内容" />
      <template v-if="!isEmpty">
        <!-- <van-checkbox-group v-model="checked" ref="checkboxGroup"> -->
          <template v-for="(item, i) in state.list" :key="i">
            <!-- <div class="person_block"> -->
            <van-cell :title="item.name">
              <!-- <template #icon>
                <van-checkbox :name="i" />
              </template> -->
              <van-button type="primary" @click="onModify(item)">{{
                role == "教学秘书"
                  ? "分配专家"
                  : role == "专家"
                  ? "评审"
                  : "查看详情"
              }}</van-button>
              <!-- <van-button type="danger" @click="onDelete(i, item)"
                >删除</van-button
              > -->
            </van-cell>
            <!-- </div> -->
          </template>
        <!-- </van-checkbox-group> -->
      </template>
    </List>
  </div>

  <Dialog
    v-model:show="showDialog"
    :title="dialogTitle"
    :show-cancel-button="true"
    confirm-button-text="提交"
    @confirm="onConfirm"
    :beforeClose="beforeClose"
    closeOnClickOverlay

  >
    <van-cell-group title="论文信息">
      <van-cell
        :title="key"
        :value="val"
        v-for="(val, key) in detail"
        :key="val"
      />
    </van-cell-group>
    <van-cell-group v-if="role!='教学秘书'"  title="论文下载">
      <van-button  type="primary" @click="download">点击下载</van-button>
    </van-cell-group>
    <van-cell-group title="工作区">
      <DropdownMenu
        v-if="role == '教学秘书' || role == '专家'"
        :overlay="false"
        z-index="3000"
        direction="up"
      >
        <DropdownItem
          v-model="dropDownState.value"
          :options="option"
          teleport="body"
        />
      </DropdownMenu>
      <van-field
        v-else
        v-model="suggestions"
        label="意见"
        placeholder="请输入意见"
      />
    </van-cell-group>
    <!-- </van-form>  -->
    <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
  </Dialog>
  <loading-overlay :show="showOverlay" />
</template>
<script>
import { Search, List, Dialog, DropdownMenu, DropdownItem } from "vant";
import loadingOverlay from "./loadingOverlay.vue";
import { ref, reactive } from "vue";
export default {
  name: "paperWork",
  data() {
    return {
      queryNo: null,
      // submitMode: 0,
      dept: null,
      user: null,
      role: null,
      page: 1,
      result: [],
      link:null,
      // checked: [],
      // checkAll: false,
      dialogTitle: "",
      isEmpty: false,
      detail: {
        论文编号: null,
        论文题目: null,
        字数: null,
        摘要: null,
        关键字: null,
        作者学号: null,
        指导教师编号: null,
        评审专家: null,
        是否提交: null,
        状态: null,
        
      },
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
    this.role = storage.getItem("teacherRole");
    this.dept = storage.getItem("teacherDept");
    this.onSearch("");
    this.initExperts();
  },
  setup() {
    const suggestions = ref("");
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
      suggestions,
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
    download(){
      window.open(this.link, '_blank');
    },
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
    beforeClose(action){
      // console.log(action)
      return new Promise((resolve) => {

        if (action=='cancel'||this.role=="指导教师"||this.dropDownState.value!=0) {
          resolve(true);
        } else {
          this.$notify({ type: "danger", message: "请至少选择一项" });
          resolve(false);
        }
      })
    },
    initExperts() {
      if (this.role == "专家") {
        this.option = [
          { text: "是否通过", value: 0 },
          { text: "通过", value: 1 },
          { text: "不通过", value: 2 },
        ];
        return;
      } else if (this.role == "指导教师") return;
      let self = this;
      this.$http({
        method: "get",
        url: "/teacherPage/deptTeacher",
        params: {
          dept: this.dept,
        },
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);

            self.option = self.option.concat(res.data);
            console.log(self.option);
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
    onConfirm() {
      if(this.dropDownState.value==0&&this.role != "指导教师")
        return
      let values = null;
      if (this.role == "教学秘书") {
        console.log(this.dropDownState.value);
        values = {
          no: this.queryNo,
          rtno: this.dropDownState.value,
          handle: 0,
        };
      } else if (this.role == "专家") {
        console.log(this.option[this.dropDownState.value].text);
        values = {
          no: this.queryNo,
          status: this.option[this.dropDownState.value].text,
          handle: 2,
        };
      } else {
        console.log(this.suggestions);
        values = {
          no: this.queryNo,
          suggest: this.suggestions,
          handle: 1,
        };
      }

      let self = this;
      this.$http({
        method: "post",
        url: "/teacherPage/handleArticle",
        data: values,
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);
            if (res.data.success) {
              self.$notify({ type: "success", message: "操作成功" });
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
      this.queryNo = item.no;
      this.showOverlay = true;
      this.submitMode = 1;
      let self = this;
      this.$http({
        method: "get",
        url: "/teacherPage/modifyArticle",
        params: {
          user: item.no,
        },
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);

            self.detail.论文编号 = res.data.no;
            self.detail.论文题目 = res.data.name;
            self.detail.字数 = res.data.num;
            self.detail.摘要 = res.data.summary;
            self.detail.关键字 = res.data.keyword;
            self.detail.作者学号 = res.data.sno;
            self.detail.指导教师编号 = res.data.tno;
            self.detail.评审专家 = res.data.rtno;
            self.detail.是否提交 = res.data.checkin;
            self.detail.状态 = res.data.status;
            self.link=res.data.link;

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
    // selectAll() {
    //   if (this.$refs.checkboxGroup == null) return;
    //   this.$refs.checkboxGroup.toggleAll(!this.checkAll);
    //   this.checkAll = !this.checkAll;
    // },
    // modifySelect() {
    //   if (this.checked.length == 0) return;
    //   let noList = [];
    //   for (let i in this.checked) {
    //     noList.push(this.state.list[i].no);
    //   }
    //   console.log(noList);
    //   Dialog.confirm({
    //     title: "删除确认",
    //     message: "确认要删除这些人员吗",
    //   })
    //     .then(() => {
    //       let self = this;
    //       this.$http({
    //         method: "post",
    //         url: "/teacherPage/deletePaper",
    //         data: {
    //           user: noList,
    //         },
    //       })
    //         .then(function (res) {
    //           if (res.status == 200) {
    //             console.log(res.data);
    //             if (res.data.success) {
    //               self.$notify({ type: "success", message: "删除成功" });
    //               for (let i = self.checked.length - 1; i >= 0; i--) {
    //                 self.state.list.splice(self.checked[i], 1);
    //               }
    //               self.$refs.checkboxGroup.toggleAll(false);
    //               self.checkAll = false;
    //               // this.onLoad();
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
    onSearch(key) {
      let url = null;
      let params = null;
      if (this.role == "指导教师") {
        url = "/teacherPage/zcheckArticle";
        params = {
          keyWords: key,
          tno: this.user,
        };
      } else if (this.role == "专家") {
        url = "/teacherPage/pcheckArticle";
        params = {
          keyWords: key,
          tno: this.user,
        };
      } else {
        params = {
          keyWords: key,
          dept: this.dept,
        };
        url = "/teacherPage/mcheckArticle";
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
        params: params,
      })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res.data);
            self.result = res.data;
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
.van-dropdown-item--up {
  width: 700px;
  margin: 0 auto;
}
.van-dialog{
  overflow: auto;
  max-height: 700px;
  width: 700px;
}
</style>