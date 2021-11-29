import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Datetimepicker, Table, Icon, Button, Switch, Notification  } from '@oruga-ui/oruga-next'
//import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full-vars.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(App).use(store).use(router);

app.component("vue-fontawesome", FontAwesomeIcon);

//add oruga component or add the Full bundle using 
//app.use(Oruga)
app.use(Datetimepicker).use(Table).use(Icon).use(Button).use(Switch).use(Notification)


app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js';