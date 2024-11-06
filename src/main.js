import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.js';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
});

app.use(router);
app.mount('#app');
