<script setup lang="ts">
import { computed } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { ModelType, get_form_by_model, type inputFilters } from '@/common/types';
import FormFields from '@/views/components/form/FormFields.vue';

import { useGeneralStore } from '@/common/stores/general';
import { create_input_filter } from '@/common/utils/transformation/form';

import { array_obj_to_obj_with_key } from '@/common/utils/transformation';
import { useAuthStore } from '@/common/stores/auth';

const router = useRouter();
const store = useGeneralStore();

const route = useRoute();

const store_general = useGeneralStore();
const auth_store = useAuthStore();

const url = computed<string>(() => route.params.url as string);
const model = computed<ModelType>(() => route.params.model as ModelType);
const is_add: boolean = url.value === 'add';
const controls = computed<inputFilters>(() =>
  create_input_filter(
    get_form_by_model(model.value),
    is_add ? {} : array_obj_to_obj_with_key(store.list[model.value] as [], +url.value, 'id')
  )
);

const create_update = async (data: inputFilters) => {
  try {
    await store_general.create_update_row_input_form(data, model.value, url.value, is_add);
    if (model.value === ModelType.teacher) await router.push('/login');
    else if (model.value === ModelType.student && is_add) await router.push(`/${ModelType.student}`);
    else await router.push(`/${ModelType.student}/view/${auth_store.student_id}`);
  } catch (e) {}
};
</script>
<template>
  <v-row>
    <v-col class="d-flex flex-row mt-2 justify-space-around" cols="12" sm="12">
      <FormFields :is_add="url === 'add'" :type="model" :controls="controls" @sendForm="create_update" />
    </v-col>
  </v-row>
</template>
