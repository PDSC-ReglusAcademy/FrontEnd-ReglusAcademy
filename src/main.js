import { createApp } from 'vue'
import App from './App.vue'
import router from "@/routes/router.js"
// Importando Bootstrap CSS e JavaScript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // Importar Bootstrap JavaScript
createApp(App).use(router).mount('#app')

