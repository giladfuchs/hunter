import { deep_copy_stringify } from '@/common/utils/transformation';
import { ModelType } from '@/common/types';

export const columns_student = [
  {
    field: 'name',
    width: 160
  },
  {
    field: 'phone',
    width: 160
  },
  {
    field: 'grade',
    width: 160
  },

  {
    field: 'assignments',
    width: 160,
    cellRenderer: 'AssignmentsRenderer'
  },
  {
    headerName: 'View',
    field: 'id',
    width: 160,
    cellRenderer: 'ActionRender'
  }
];

export const get_columns_by_title = (title: ModelType) => {
  let columns = [];
  switch (title) {
    case ModelType.student:
      columns = deep_copy_stringify(columns_student);
      break;

    default:
      columns = columns_student;
  }

  return columns;
};
