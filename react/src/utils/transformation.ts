import _ from 'lodash';
import { FormField } from '../types/form';

export const create_form_fields = (source: FormField[], target: any): FormField[] => {
    if (_.isEmpty(target)) return source.map((field) => ({ ...field }));
    return source.map((field) => {
        const updatedValue = target[field.key] ?? '';
        return { ...field, value: updatedValue };
    });
};

export const array_obj_to_obj_with_key = (iterable: any[], value: any, key: string) =>
    iterable.find((o: any) => o[key]?.toString() === value.toString());
