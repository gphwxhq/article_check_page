<template>
  <!-- <div class="container"> -->
  <div class="title">
    <img
      style="width: 25px; height: 25px; padding-right: 5px"
      src="../assets/logo.png"
    />
    <div style="display: inline-block">论文审核系统</div>
    <div class="ltitle">学生端</div>
    <div class="rtitle">欢迎您,x</div>
  </div>
  <sideBar
    @change="handleChange"
    :mlist="['个人信息', '提交论文', '查看结果']"
  ></sideBar>
  <div class="main">
    <div style="width: 100%" v-if="type == 0">
      <!-- <button v-on:click = "show = !show">点我</button> -->
      <transition name="van-slide-left">
        <table v-show="show" class="mtb">
          <!-- <tr>
        <th>Heading</th>
        <th>Another Heading</th>
      </tr> -->
          <tr>
            <td class="gcol">姓名</td>
            <td class="gitem">row 1, cell 2</td>
            <td class="gcol">学号</td>
            <td class="gitem">row 1, cell 2</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
          <tr>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
            <td class="gcol">etc</td>
            <td class="gitem">etc</td>
          </tr>
        </table>
      </transition>
    </div>
    <div style="width: 100%" v-if="type == 1">
      <van-form @submit="onSubmit" ref="mform">
        <van-field v-model="state.text1" label="文本" />
      </van-form>
      <van-field name="uploader" label="文件上传">
        <template #input>
          <uploader
            v-model="value"
            :max-count="1"
            :preview-full-image="false"
            result-type="file"
            accept="*"
          >
            <van-button icon="plus" type="primary">上传文件</van-button>
          </uploader>
        </template>
      </van-field>
      <!-- <van-cell-group v-if="type == 0" style="width: 80%">
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group> -->
      <!-- <van-cell-group v-else-if="type == 1" style="width: 80%">
      <van-cell title="单元格2" value="内容" />
      <van-cell title="单元格2" value="内容" label="描述信息" />
    </van-cell-group>
    <van-cell-group v-else style="width: 80%">
      <van-cell title="单元格3" value="内容" />
      <van-cell title="单元格3" value="内容" label="描述信息" />
    </van-cell-group> -->
      <van-button type="success">成功按钮</van-button>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import sideBar from "./sideBar.vue";
import { reactive, ref } from "vue";
import { uploader } from "vant";
export default {
  name: "stuPage",
  data() {
    return {
      type: 0,
      show: false,
    };
  },
  setup() {
    const state = reactive({
      text1: "",
      text2: "",
      text3: "",
    });
    const value = ref([]);
    // const value = ref([{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }]);
    return {
      state,
      value,
    };
  },
  components: {
    sideBar,
    uploader,
  },
  mounted() {
    console.log(this.$route.query);
    // console.log(this.$root.user);
    this.show = true;
  },
  methods: {
    handleChange(index) {
      this.type = index;
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
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  font-size: 30px;
  /* margin-bottom: 10px; */
  color: white;
}
.ltitle {
  padding-left: 10px;
  display: inline-block;
  font-size: 20px;
}
.rtitle {
  padding-top: 5px;
  font-size: 20px;
  float: right;
  color: rgb(237, 243, 244);
}
.mtb {
  border: solid 1px;

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
  width: 100px;
  padding-right: 5px;
  text-align: right;
}
.gitem {
  width: 200px;
  text-align: left;
  padding-left: 5px;
}

</style>