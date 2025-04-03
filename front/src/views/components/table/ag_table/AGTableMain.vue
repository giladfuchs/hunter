<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
// common components
import 'vue3-easy-data-table/dist/style.css';
import TableBase from '@/views/components/table/ag_table/AGTableBase.vue';
import TableHeaderDashBoard from './AGTableHeader.vue';

import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import { get_columns_by_title } from '@/common/types/table/ag_table';
import { FilterFetchType } from '@/common/types';

interface Props {
  title: FilterFetchType;
  list_rows: [];
}

const props = defineProps<Props>();

const ref_base_table = ref(null);
const ref_header_table = ref(null);
const columns1 = computed(() => props.title);
const columns = computed(() => get_columns_by_title(columns1.value));

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
        <TableHeaderDashBoard ref="ref_header_table" v-bind="{ child: ref_base_table, title, columns }" />

        <div>
          <TableBase v-bind="{ columns, rows: itemsSearching }" />
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
