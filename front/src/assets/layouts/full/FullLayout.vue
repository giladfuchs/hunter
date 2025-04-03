<script setup lang="ts">
import { RouterView } from 'vue-router';
import VerticalHeaderVue from '@/assets/layouts/full/vertical-header/VerticalHeader.vue';
import Customizer from '@/assets/layouts/full/customizer/Customizer.vue';
import { useCustomizerStore } from '@/common/stores/customizer';
import { useAuthStore } from '@/common/stores/auth';
import { computed, ref, watch } from 'vue';
const customizer = useCustomizerStore();
const auth_store: any = useAuthStore();
const error_snackbar = ref(false);
// const success_snackbar = ref(false);

const error_message_change = computed(() => customizer.error_message !== '');

watch(error_message_change, () => {
  if (error_message_change.value) error_snackbar.value = true;
});
</script>

<template>
  <v-locale-provider>
    <v-app
      v-if="auth_store.authenticated"
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.fontTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.inputBg ? 'inputWithbg' : ''
      ]"
    >
      <Customizer />
      <VerticalHeaderVue />

      <v-main>
        <v-progress-linear
          v-if="customizer.loading"
          style="z-index: 124; top: 4.9rem; height: 0.4rem; width: 100%; position: fixed"
          color="primary"
          indeterminate
        ></v-progress-linear>

        <v-container fluid class="page-wrapper">
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <RouterView />
            <v-snackbar color="error" variant="flat" elevation-1 rounded="md" v-model="error_snackbar">
              {{ customizer.error_message }}
              <template v-slot:actions>
                <v-btn color="white" variant="text" @click="error_snackbar = false">
                  <XIcon size="20" stroke-width="1.5" />
                </v-btn>
              </template>
            </v-snackbar>
            <v-snackbar color="success" variant="flat" elevation-1 rounded="md" v-model="customizer.success_snackbar">
              {{ customizer.success_message }}
              <template v-slot:actions>
                <v-btn color="white" variant="text" @click="customizer.success_snackbar = false">
                  <XIcon size="20" stroke-width="1.5" />
                </v-btn>
              </template>
            </v-snackbar>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
