<script setup lang="ts">
import { ref, computed } from 'vue';
import 'vue3-easy-data-table/dist/style.css';
import AGTableBase from '@/views/components/table/ag_table/AGTableBase.vue';
import AGTableHeader from './AGTableHeader.vue';

import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import { get_columns_by_title } from '@/common/types/table/ag_table';
import { ModelType } from '@/common/types';

interface Props {
  title: ModelType;
  list_rows: [];
}

const props = defineProps<Props>();

const ref_base_table = ref(null);
const ref_header_table = ref(null);
const columns = computed(() => get_columns_by_title(props.title));

const itemsSearching = computed(() => {
  const temp_search_value: string = ref_header_table.value ? ref_header_table.value.search_value.toString() : '';
  if (temp_search_value !== '') {
    const regex = new RegExp(temp_search_value, 'i');
    const filter_res: any[] = props.list_rows.filter((item: any) => regex.test(Object.values(item).join(' ').toLowerCase()));
    if (props.list_rows.length !== 0 && filter_res.length === 0) filter_res.push({});
    return filter_res;
  }

  return props.list_rows;
});
</script>
<template>
  <v-row style="height: 50rem">
    <v-col cols="12" md="12">
      <UiParentCard>
        <AGTableHeader ref="ref_header_table" v-bind="{ child: ref_base_table, title, columns }" />
        <AGTableBase ref="ref_base_table" v-bind="{ columns, rows: itemsSearching }" />
      </UiParentCard>
    </v-col>
  </v-row>
</template>
