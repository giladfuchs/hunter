import { useNavigate, useParams } from 'react-router-dom';
import FormChild from './FormChild';
import { DefaultRootStateProps, ModelType } from '../../types';
import { FormField, get_form_by_model } from '../../types/form';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { array_obj_to_obj_with_key, create_form_fields } from '../../utils/transformation';
import { createOrUpdateRow } from 'store/modelSlice';
import { AppDispatch } from 'store';

const Form = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id, model } = useParams() as {
        id: string;
        model: ModelType;
    };
    const { list, student_id, user_id } = useSelector((state: DefaultRootStateProps) => state.models);

    const model_objs = list[model];
    const is_add: boolean = id === 'add';

    const obj = is_add ? {} : array_obj_to_obj_with_key(model_objs, id, 'id') ?? {};
    const fields: FormField[] = create_form_fields(get_form_by_model(model), obj);

    const handleSubmit = async (send_fields: FormField[]) => {
        const data = Object.fromEntries(send_fields.map((f) => [f.key, f.value]));
        if (model.includes(ModelType.student)) data.teacher_id = user_id;
        if (model.includes(ModelType.assignment)) {
            data.teacher_id = user_id;
            data.student_id = student_id;
        }
        try {
            await dispatch(createOrUpdateRow({ model, data, id })).unwrap();
            if (model === ModelType.teacher) navigate(`/login`);
            else if (model === ModelType.student && is_add) navigate(`/${ModelType.student}`);
            else navigate(`/view/${student_id}`);
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    return <FormChild title={is_add ? `Add ${model}` : `Edit ${model}`} fields={fields} onSubmit={handleSubmit} />;
};

export default Form;
