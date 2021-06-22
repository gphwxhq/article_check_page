<template>
    <Overlay :show="show">
    <div class="overlayWraper">
      <div>
        <van-loading color="#1989fa" size="50px" vertical>加载中</van-loading>
      </div>
    </div>
  </Overlay>
</template>
<script>
import {Overlay} from 'vant'
export default {
  name: "loadingOverlay",
  props: ["show"],
  components:{
      Overlay
  },
};
</script>