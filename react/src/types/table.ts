import { HeadCell, ModelType } from 'types';

type TableData = {
    cells: string[];
    heads: HeadCell[];
};
export const create_header_cell = (field: string): HeadCell => ({
    field,
    id: field,
    numeric: false,
    label: field.toUpperCase(),
    align: 'center'
});
const create_header = (fields_header: string[]): HeadCell[] => fields_header.map((field: string) => create_header_cell(field));
export const teacher_fields = ['id', 'phone'];

export const get_table_head_cell = (model: ModelType): TableData => {
    let cells: string[] = teacher_fields;

    switch (model) {
        case ModelType.teacher:
            cells = teacher_fields;
            break;
    }
    const heads: HeadCell[] = create_header(cells);

    return { cells, heads };
};
