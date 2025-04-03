import { FilterFetchType } from '@/common/types';
import type { Header } from 'vue3-easy-data-table';

export const columns_teacher = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Phone', value: 'phone', sortable: true }
];

export const get_columns_easy_table_by_title = (title: FilterFetchType): Header[] => {
  let columns: Header[] = [];

  // @ts-ignore
  switch (title) {
    case FilterFetchType.teacher:
      columns = columns_teacher;
      break;

    default:
      columns = columns_teacher;
  }

  return columns;
};
