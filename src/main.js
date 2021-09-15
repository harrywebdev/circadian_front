import { createApp } from 'vue';
import store from '@/store/index';
import router from '@/router/index';
import App from './App.vue';
import ErrorService from '@/domain/error-service';

const app = createApp(App)
  .use(store)
  .use(router);

app.config.errorHandler = function(err) {
  ErrorService.onError(err);
};

app.mount('#app');
