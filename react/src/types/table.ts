import { ModelType } from 'types';

export const teacher_fields = ['id', 'phone'];

export const get_table_head_cell = (model: ModelType): string[] => {
    let cells: string[] = teacher_fields;

    switch (model) {
        case ModelType.teacher:
            cells = teacher_fields;
            break;
    }
    return cells;
};
