import React from 'react';
import { Grid, Button, TextField, Autocomplete } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { FieldAutoComplete, FormField, FormType } from '../../types/form';

type FormFieldProps = {
    field: FormField;
    onChange: (value: any, key: string) => void;
};

const FieldRenderer = ({ field, onChange }: FormFieldProps) => {
    switch (field.type) {
        case FormType.AutoComplete:
            return (
                <Autocomplete
                    disablePortal
                    options={(field as FieldAutoComplete).options}
                    value={field.value}
                    onChange={(e, value) => onChange(value, field.key)}
                    renderInput={(params) => <TextField {...params} label={field.key} />}
                />
            );
        case FormType.TEXT:
        case FormType.TEXTAREA:
        case FormType.NUMBER:
        default:
            return (
                <TextField
                    fullWidth
                    variant="outlined"
                    label={field.key}
                    placeholder={field.key}
                    value={field.value}
                    type={field.type === FormType.NUMBER ? 'number' : 'text'}
                    multiline={field.type === FormType.TEXTAREA}
                    rows={field.type === FormType.TEXTAREA ? 5 : undefined}
                    onChange={(e) => onChange(e.target.value, field.key)}
                />
            );
    }
};

interface FormChildProps {
    title: string;
    fields: FormField[];
    onSubmit: (send_fields: FormField[]) => void;
}

export default function FormChild({ title, fields, onSubmit }: FormChildProps) {
    const [localFields, setLocalFields] = React.useState<FormField[]>(fields);

    const handleChange = (value: any, key: string) => {
        const updatedFields = localFields.map((field) => {
            if (field.key === key) {
                return { ...field, value };
            }
            return field;
        });
        setLocalFields(updatedFields);
    };

    const handleSubmit = () => {
        onSubmit(localFields);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={6} lg={4}>
                <MainCard title={title} sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        {localFields.map((field) => (
                            <Grid item xs={12} key={field.key}>
                                <FieldRenderer field={field} onChange={handleChange} />
                            </Grid>
                        ))}
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <Button variant="contained" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
}
