import { createApp } from 'vue'
import { Button, Form, Field } from 'vant'
import App from './App.vue'
import { RadioGroup, Radio, Notify, Icon } from "vant";
import { createRouter, createWebHashHistory } from 'vue-router'
import '@vant/touch-emulator';

import page1 from './components/login.vue';
import page2 from './components/stuPage.vue';
import page3 from './components/teacherPage.vue';
import page4 from './components/adminPage.vue';

import baseInfo from './components/baseInfo.vue'
import uploadArtile from './components/uploadArticle.vue'
import checkResult from './components/checkResult.vue'

import manageAllPerson from './components/manageAllPerson.vue'


const routes = [
  { path: '/', name: 'login', component: page1 },
  { path: "/stuPage", name: 'stuPage', component: page2, children: [{ path: '',name:'stu0', component: baseInfo },{ path: 'uploadArticle',name:'stu1', component: uploadArtile },{ path: 'checkResult',name:'stu2', component: checkResult }] },
  { path: "/teacherPage", name: 'teacherPage', component: page3 },
  { path: "/adminPage", name: 'adminPage', component: page4,children: [{ path: '',name:'admin0', component: manageAllPerson }]},
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

app.use(router)
app.use(Button)
app.use(Form)
app.use(Field)
app.use(RadioGroup)
app.use(Radio)
// app.use(CellGroup)
app.use(Icon)
app.use(Notify)

app.mount('#app')
