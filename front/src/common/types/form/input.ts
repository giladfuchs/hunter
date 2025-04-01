import {FilterFetchType} from "@/common/types";


export interface InputFilter {
    value: any;
    filter?: string;
    options?: string[];
    type?: string;
}

export interface DBQuery {
    opt?: string;
    key: string;
    value: string | [];

}

export interface FilterQuery {
    distinct?: string;
    query?: DBQuery [];
    group_by?: string [];
    flags?: string [];

}


export type inputFilters = {
    [key: string]: InputFilter
};
export const get_default_val = (): InputFilter => {
    return {value: '', filter: 'eq', type: 'text'}
}
export const get_default_val_number = (): InputFilter => {
    return {value: '', filter: 'eq', type: 'number'}
}


export const default_teacher_model: inputFilters = {
    id: get_default_val_number(),
    phone: get_default_val_number(),

}
export const default_student_model: inputFilters = {
    name: get_default_val(),
    phone: get_default_val_number(),
    grade: get_default_val(),

}

export const default_assignment_model: inputFilters = {
    title: get_default_val(),
    detail: {value: '', filter: 'eq', type: 'textarea'},

}

 

export const get_form_by_model = (model: FilterFetchType) => {
    let form_fields: inputFilters
    switch (model) {
        case FilterFetchType.teacher:
            form_fields = default_teacher_model;
            break;


        case FilterFetchType.student:
            form_fields = default_student_model;
            break;

        case FilterFetchType.assignment:
            form_fields = default_assignment_model;
            break;



        default:
            form_fields = default_teacher_model;

    }

    return form_fields
}
