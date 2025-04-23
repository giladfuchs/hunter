import { ModelType, Student } from './general';
import { ColDef } from 'ag-grid-community';

export const columns_student: ColDef<Student>[] = [
    {
        field: 'name',
        headerName: 'Name'
    },
    {
        field: 'phone',
        headerName: 'Phone'
    },
    {
        field: 'grade',
        headerName: 'Grade'
    },
    {
        headerName: 'Assignments',
        field: 'assignments',
        cellRenderer: 'AssignmentsRender'
    }
    // {
    //     field: 'assignments',
    //     width: 160,
    //     cellRenderer: 'AssignmentsRenderer'
    // },
    // {
    //     headerName: 'View',
    //     field: 'id',
    //     width: 160,
    //     cellRenderer: 'ActionRender'
    // }
];

export const get_columns_by_title = (title: ModelType): ColDef<Student>[] => {
    let columns = [];
    switch (title) {
        case ModelType.student:
            columns = [...columns_student];
            break;

        default:
            columns = [...columns_student];
    }

    return columns;
};
