<script setup lang="ts">
import {computed} from 'vue';

// common components
import {useRoute, useRouter} from "vue-router";
import {FilterFetchType, get_form_by_model, type inputFilters,} from "@/common/types";
import SendForm from '@/views/components/form/SendForm.vue';

import {useGeneralStore} from "@/common/stores/apps/general";
import {create_input_filter} from "@/common/utils/transformation/form";
import {useFilterFetchStore} from "@/common/stores/apps/filter_fetch";
import {array_obj_to_obj_with_key} from "@/common/utils/transformation";

const router = useRouter();
const store = useFilterFetchStore();

const route = useRoute()

const store_general = useGeneralStore();

const url = computed<string>(() => route.params.url as string);
const model = computed<FilterFetchType>(() => route.params.model as FilterFetchType);

const controls = computed<inputFilters>(() =>
    create_input_filter(get_form_by_model(model.value), url.value !== 'add' ? array_obj_to_obj_with_key(store.list[model.value] as [], +url.value, 'id') : {})
)


const create_update = async (data: inputFilters) => {
  await store_general.create_update_row_inputFilters(data, `${model.value}/${url.value}`, `${model.value} on id ${url.value}`);
  if (model.value === FilterFetchType.teacher)
    await router.push("/login")
  else if (model.value === FilterFetchType.student && url.value === 'add')
    await router.push(`/${FilterFetchType.student}`)
  else
    await router.push(`/${FilterFetchType.student}/view/${url.value}`)

}


</script>
<template>
  <v-row>
    <v-col class="d-flex flex-row mt-2 justify-space-around" cols="12" sm="12">
      <SendForm :type="model" :controls="controls" @sendForm="create_update"/>
    </v-col>
  </v-row>
</template>

