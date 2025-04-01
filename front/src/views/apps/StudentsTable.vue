<script setup lang="ts">
import {computed, onMounted, watch} from 'vue';

// common components
import MainEasyTable from '@/views/components/table/easy_table/MainEasyTable.vue';

import TableMain from '@/views/components/table/ag_table/AGTableMain.vue';
import {useRoute} from "vue-router";

import {FilterFetchType} from "@/common/types";
import {useFilterFetchStore} from "@/common/stores/apps/filter_fetch";


const store = useFilterFetchStore();

const route = useRoute()


const model = computed<FilterFetchType>(() => route.params.model as FilterFetchType);

const init = async () => {
  model.value && await store.fetch_rows(model.value);

}
watch(store.list[model] , async () => {
  await init()

});


onMounted(async () => {
  await init()
});
</script>
<template>

  <v-row class="mt-1" v-if="model && store.list[model]">
    <v-col cols="12" md="12">


      <TableMain v-bind="{title:model, list_rows: store.list[model]}"/>

    </v-col>
  </v-row>


</template>
