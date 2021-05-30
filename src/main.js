import { createApp } from 'vue'
import{Button,Form,Field} from 'vant'
import App from './App.vue'
import { Sidebar, SidebarItem,RadioGroup,Radio } from "vant";

const app=createApp(App)
app.use(Button)
app.use(Form)
app.use(Field)
app.use(Sidebar)
app.use(SidebarItem)
app.use(RadioGroup)
app.use(Radio)

app.mount('#app')
