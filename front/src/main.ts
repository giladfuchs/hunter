import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './views/components/App.vue';
import { router } from './common/router';
import vuetify from './assets/layouts/plugins/vuetify';
import '@/assets/layouts/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueTablerIcons from 'vue-tabler-icons';

import Maska from 'maska';
// print
import print from 'vue3-print-nb';
// Table
import Vue3EasyDataTable from 'vue3-easy-data-table';
//i18

import { createI18n } from 'vue-i18n';

import messages from '@/common/utils/locales/messages';
import piniaPersist from 'pinia-plugin-persist';

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages: messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});

const app = createApp(App);
app.use(router);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(PerfectScrollbar);
app.use(createPinia().use(piniaPersist));
app.use(VueTablerIcons);
app.use(print);

app.use(i18n);
app.use(Maska);
app.use(vuetify).mount('#app');
