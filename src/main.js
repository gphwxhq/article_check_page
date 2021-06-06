import { createApp } from 'vue'
import { Button, Form, Field } from 'vant'
import App from './App.vue'
import { RadioGroup, Radio,Notify,Icon} from "vant";
import { createRouter, createWebHashHistory } from 'vue-router'

import page1 from './components/login.vue';
import page2 from './components/stuPage.vue';


const routes = [
  { path: '/', name: 'login', component: page1 },
  { path: "/stuPage", name: 'stuPage', component: page2 },
]

localStorage['user']=null

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'login'&&localStorage.getItem('user')=='null' ) next({ name: 'login' })
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
