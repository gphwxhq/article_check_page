import { createApp} from 'vue'
import App from './App.vue'
import axios from "axios";
import { RadioGroup, Radio, Notify,Button, Form, Field, Loading,Empty,Cell,CellGroup,Checkbox,CheckboxGroup} from "vant";
import { createRouter, createWebHashHistory } from 'vue-router'
import '@vant/touch-emulator';

import page1 from './components/login.vue';
import page2 from './components/stuPage.vue';
import page3 from './components/teacherPage.vue';
import page4 from './components/adminPage.vue';

import baseInfo from './components/baseInfo.vue'
import uploadArticle from './components/uploadArticle.vue'
import checkResult from './components/checkResult.vue'

import teacherBaseInfo from './components/teacherBaseInfo'
import manageStudent from './components/manageStudent'
import paperWork from './components/paperWork'

import manageAllPerson from './components/manageAllPerson.vue'
import manageAllArticle from './components/manageAllArticle.vue'
// import systemSetting from './components/systemSetting.vue'


axios.defaults.timeout=5000;
// axios.defaults.headers.post['content-type']='application/x-www-form-urlencoded';

const routes = [
  { path: '/', name: 'login', component: page1 },
  { path: "/stuPage", name: 'stuPage', component: page2, children: [{ path: '',name:'stu0', component: baseInfo },{ path: 'uploadArticle',name:'stu1', component: uploadArticle },{ path: 'checkResult',name:'stu2', component: checkResult }] },
  { path: "/teacherPage", name: 'teacherPage', component: page3, children: [{ path: '',name:'teacher0', component: teacherBaseInfo },{ path: 'paperWork',name:'teacher1', component:paperWork },{ path: 'manageStudent',name:'teacher2', component: manageStudent }] },
  { path: "/adminPage", name: 'adminPage', component: page4,children: [{ path: '',name:'admin0', component: manageAllPerson },{ path: '',name:'admin1', component: manageAllArticle }]},
]

localStorage['user'] = null

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && localStorage.getItem('user') == 'null') next({ name: 'login' })
  else next()
})
// &&localStorage.getItem('user')==null

const app = createApp(App)

app.config.globalProperties.$http = axios

app.use(router)
app.use(Button)
app.use(Form)
app.use(Field)
app.use(RadioGroup)
app.use(Radio)
app.use(Loading)
app.use(Empty)
app.use(Cell)
app.use(CellGroup)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(Notify)

app.mount('#app')
