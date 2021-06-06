<template>
    <search
  v-model="searchValue"
  placeholder="请输入要搜索的人员"
  input-align="center"
/>
</template>
<script>
import { Search } from 'vant';
import{ref} from 'vue';
export default {
    name:'manageAllPerson',
    components:{
        Search
    },
    setup() {
    const searchValue = ref('');
    return { searchValue };
  },
}
</script>