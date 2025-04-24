import { Assignment, ModelType, Student } from './general';
import { ColDef } from 'ag-grid-community';

export type AGTableModelType = Student;
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
    },
    {
        headerName: 'View',
        field: 'id',
        cellRenderer: 'ActionRender',
        width: 100
    }
];

export const get_columns_by_title = (title: ModelType): ColDef<AGTableModelType>[] => {
    let columns = [];
    switch (title) {
        case ModelType.student:
            columns = [...columns_student];
            break;

        default:
            columns = [...columns_student];
    }

    return columns as ColDef<AGTableModelType>[];
};
