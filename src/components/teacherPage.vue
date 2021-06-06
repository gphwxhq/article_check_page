<template>
  <!-- <div class="container"> -->
  <div class="title">
    <img
      style="width: 25px; height: 25px; padding-right: 5px"
      src="../assets/logo.png"
    />
    <div style="display: inline-block">论文审核系统</div>
    <div class="ltitle">教师端</div>
    <div class="rtitle">欢迎您,{{ user }}</div>
  </div>
  <sideBar
    @change="handleChange"
    :mlist="['个人信息', '提交论文', '查看结果']"
  ></sideBar>
  <transition name="van-fade">
    <div v-show="show" class="main">
      <div style="width: 100%" v-if="type == 0">
        <CellGroup title="基础信息">
          <Cell
            v-bind:title="key"
            v-bind:value="val"
            v-for="(val, key) in baseInfo"
            :key="val"
          />
        </CellGroup>
        <!-- <table class="mtb">
          <tr>
            <td class="gcol">姓名</td>
            <td class="gitem">row 1, cell 2</td>
          </tr>
          <tr>
            <td class="gcol">学号</td>
            <td class="gitem">row 1, cell 2</td>
          </tr>
          <tr>
            <td class="gcol">专业</td>
            <td class="gitem">etc</td>
          </tr>
        </table> -->
      </div>
      <div style="width: 100%" v-if="type == 1">
        <Steps :active="active" @click-step="clickStep">
          <Step>填写基础信息</Step>
          <Step>提交论文</Step>
          <Step>阅读承诺书</Step>
          <Step>提交完成</Step>
        </Steps>
        <van-form @submit="onSubmit" ref="mform">
          <template v-if="active == 0">
            <van-field
              :name="key"
              v-for="(val, key) in uploadInfo"
              :key="val"
              :label="val"
              :placeholder="key"
              :rules="[{ required: true, message: '表单不能为空' }]"
              v-model="state[val]"
            />
          </template>

          <van-field v-if="active == 1" name="uploader" label="文件上传">
            <template #input>
              <uploader
                v-model="fileList"
                :max-count="1"
                :preview-full-image="false"
                result-type="file"
                accept="*"
              >
                <van-button icon="plus" type="primary">上传文件</van-button>
              </uploader>
            </template>
          </van-field>
          <template  v-if="active==3">
          <van-icon name="passed" color="green" size="100"/>
          <div> 提交成功</div>
          </template>
          <van-button v-if="active < 3" type="success" native-type="submit">{{
            active == 2 ? "提交" : "下一步"
          }}</van-button>
        </van-form>
      </div>
      <div style="width: 100%" v-if="type == 2">
        <CellGroup title="基础信息">
          <Cell
            v-bind:title="key"
            v-bind:value="val"
            v-for="(val, key) in articleInfo"
            :key="val"
          />
        </CellGroup>
        <!-- <table class="mtb">
          <tr>
            <td class="gcol">论文编号</td>
            <td class="gitem">row 1, cell 2</td>
          </tr>
          <tr>
            <td class="gcol">标题</td>
            <td class="gitem">row 1, cell 2</td>
          </tr>
          <tr>
            <td class="gcol">审核状态</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">审核结果</td>
            <td class="gitem">etc</td>
          </tr>
        </table> -->
      </div>
    </div>
  </transition>
  <!-- </div> -->
</template>
<script>
import sideBar from "./sideBar.vue";
import { reactive, ref } from "vue";
import { uploader, CellGroup, Cell, Step, Steps } from "vant";
export default {
  name: "stuPage",
  data() {
    return {
      user: null,
      type: 0,
      fData: [[], []],
      show: false,
      active: 0,
      baseInfo: {
        姓名: 1,
        学号: 2,
        专业: 3,
        指导老师: 4,
      },
      articleInfo: {
        论文编号: 1,
        标题: 2,
        审核状态: 3,
        审核结果: 4,
      },
      uploadInfo: {
        title: "论文题目",
        author: "作者",
        words: "关键词",
        num: "字数",
        digest: "摘要",
      },
    };
  },
  setup() {
    const state = reactive({
      title: "",
      author: "",
      words: "",
      num: "",
      digest: "",
    });
    const fileList = ref([]);
    // const value = ref([{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }]);
    return {
      state,
      fileList,
    };
  },
  components: {
    sideBar,
    uploader,
    Cell,
    CellGroup,
    Step,
    Steps,
  },
  mounted() {
    // console.log(this.$route.query);
    // console.log(this.$root.user);
    let storage = window.localStorage;
    this.user = storage.getItem("user");
    console.log(this.user);
    this.show = true;
  },
  methods: {
    handleChange(index) {
      this.show = false;
      let self = this;
      setTimeout(function () {
        // for (let i = 0; i < self.show.length; i++) {
        //   if (index != i) self.show[i] = false;
        //   else self.show[i] = true;
        // }
        self.type = index;
        self.show = true;
      }, 500);
    },
    onSubmit(values) {

      if(this.active==1&&this.fileList.length==0){
        this.$notify({ type: "danger", message: '必须上传文件' });
        return
      }
      if (this.active < 2) {
        this.fData[this.active]=values;
        console.log(this.fData);
      }
      if(this.active==2){
        let data={};
        for (let key in this.fData[0]){
          data[key]=this.fData[0][key]
        }
        data['fileName']=this.fData[1].uploader[0].file.name
        console.log(data)

      }
      if (this.active < 3) this.active++;
    },
    clickStep(index) {
      if(this.active<3 &&this.active>index)
        this.active = index;
    },
  },
};
</script>
<style>
/* #app {
  width: 100%;
  height: 100%;
  margin-top: 60px;
} */
.main {
  margin-left: 90px;
  margin-right: 10px;
  padding: 10px;
  border-radius: 10px;
  /* display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center; */
  /* top: 2%; */
  /* width: 95%; */
  /* transform: translateY(-50%); */
  /* height: 100%; */
  /* margin: 0 auto; */
  background-color: white;
  text-align: center;
  /* margin-top: 60px; */
}
.title {
  background-color: rgb(54, 65, 80);
  /* padding-right: 50px; */
  /* text-align: center; */
  /* width: 100%; */
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 25px;
  /* margin-bottom: 10px; */
  color: white;
}
.ltitle {
  padding-left: 10px;
  display: inline-block;
  font-size: 20px;
}
.rtitle {
  padding-top: 9px;
  font-size: 15px;
  float: right;
  color: rgb(237, 243, 244);
}
.mtb {
  border: solid 1px;
  width: 100%;
  border-collapse: collapse;
}
tr {
  border-bottom: 1px solid;
}
td {
  border-left: 1px solid;
}
.gcol {
  background-color: rgb(237, 243, 244);
  /* width: 100px; */
  width: 10%;
  padding-right: 5px;
  text-align: right;
}
.gitem {
  /* width: 200px; */
  width: 90%;
  text-align: left;
  padding-left: 5px;
}
.van-cell-group__title {
  text-align: left;
}
</style>