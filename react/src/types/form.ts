/* eslint-disable max-classes-per-file */

import { ModelType } from './index';

export enum FormType {
    TEXT = 'text',
    TEXTAREA = 'textarea',
    NUMBER = 'number',
    AutoComplete = 'AutoComplete'
}

export class FieldInput {
    constructor(readonly type: FormType = FormType.TEXT, public key: string, public value: string = '') {}
}

export class FieldAutoComplete {
    constructor(readonly type: FormType = FormType.AutoComplete, public key: string, public options: string[], public value: string = '') {
        this.value = options[0];
    }
}

export type FormField = FieldAutoComplete | FieldInput;
export type InputField = {
    key: string;
    type: FormType;
    options?: string[];
};
export const student_fields: InputField[] = [
    { key: 'name', type: FormType.TEXT },
    { key: 'phone', type: FormType.NUMBER },
    { key: 'grade', type: FormType.TEXT }
];
export const assignment_fields: InputField[] = [
    { key: 'title', type: FormType.TEXT },
    { key: 'detail', type: FormType.TEXTAREA }
];
export const teacher_fields: InputField[] = [
    { key: 'id', type: FormType.NUMBER },
    { key: 'phone', type: FormType.NUMBER }
];
export const json_field_to_form_field = (json_field: InputField): FormField => {
    if ([FormType.TEXT, FormType.TEXTAREA, FormType.NUMBER].includes(json_field.type)) {
        return new FieldInput(json_field.type, json_field.key);
    }

    if (json_field.type === FormType.AutoComplete) {
        return new FieldAutoComplete(json_field.type, json_field.key, json_field.options!);
    }

    return new FieldInput(json_field.type, json_field.key);
};
export const json_fields_to_form_fields = (json_fields: InputField[]): FormField[] =>
    json_fields.map((obj: InputField) => json_field_to_form_field(obj));
// eslint-disable-next-line consistent-return
export const get_form_by_model = (type_form: ModelType): FormField[] => {
    switch (type_form) {
        case ModelType.student:
            return json_fields_to_form_fields([...student_fields]);
        case ModelType.assignment:
            return json_fields_to_form_fields([...assignment_fields]);
        case ModelType.teacher:
            return json_fields_to_form_fields([...teacher_fields]);
    }
};
/* eslint-enable max-classes-per-file */
