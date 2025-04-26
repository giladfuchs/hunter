import * as React from 'react';

import { IconButton, Paper } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { FormattedMessage } from 'react-intl';

import AGTableChild from './AGTableChild';
import { AGTableModelType, get_columns_by_title } from '../types/ag_table';
import { DefaultRootStateProps, ModelType } from '../types';
import { ColDef } from 'ag-grid-community';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListByModel } from '../store/modelSlice';
import { Link, useParams } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function AGTable() {
    const params = useParams();
    const { model } = params as {
        model: ModelType;
    };
    const dispatch = useDispatch();
    const rows: any[] = useSelector((state: DefaultRootStateProps) => state.models.list[model]);
    const cols: ColDef<AGTableModelType>[] = get_columns_by_title(model);

    React.useEffect(() => {
        dispatch(fetchListByModel({ model }));
    }, [dispatch, model]);
    return (
        <MainCard
            content={false}
            title={<FormattedMessage id={`${model}_table`} />}
            secondary={
                <IconButton size="medium" color="primary" component={Link} to={`/form/${model}/add`}>
                    <AddBoxIcon fontSize="medium" />
                </IconButton>
            }
        >
            <Paper sx={{ width: '100%', mb: 2 }}>
                <AGTableChild cols={cols} rows={rows} />
            </Paper>
        </MainCard>
    );
}
