<template>
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
      <template v-if="active == 3">
        <van-icon name="passed" color="green" size="100" />
        <div>提交成功</div>
      </template>
      <van-button v-if="active < 3" type="success" native-type="submit">{{
        active == 2 ? "提交" : "下一步"
      }}</van-button>
    </van-form>
</template>
<script>
import { reactive, ref } from "vue";
import { uploader, Step, Steps } from "vant";
export default {
    name:'uploadArticle',
    data(){
        return{
            fData: [[], []],
              active: 0,
              baseInfo: {
                姓名: 1,
                学号: 2,
                专业: 3,
                指导老师: 4,
              },
              uploadInfo: {
                title: "论文题目",
                author: "作者",
                words: "关键词",
                num: "字数",
                digest: "摘要",
              },
        }
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
    uploader,
    Step,
    Steps,
  },
  methods: {
    onSubmit(values) {
      if (this.active == 1 && this.fileList.length == 0) {
        this.$notify({ type: "danger", message: "必须上传文件" });
        return;
      }
      if (this.active < 2) {
        this.fData[this.active] = values;
        console.log(this.fData);
      }
      if (this.active == 2) {
        let data = {};
        for (let key in this.fData[0]) {
          data[key] = this.fData[0][key];
        }
        data["fileName"] = this.fData[1].uploader[0].file.name;
        console.log(data);
      }
      if (this.active < 3) this.active++;
    },
    clickStep(index) {
      if (this.active < 3 && this.active > index) this.active = index;
    },
  },
}
</script>