import * as React from 'react';

import { Paper } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

import AGTableChild from './AGTableChild';
import { AGTableModelType, get_columns_by_title } from '../types/ag_table';
import { DefaultRootStateProps, ModelType, Student } from '../types';
import { ColDef } from 'ag-grid-community';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListByModel } from '../store/modelSlice';
import { useParams } from 'react-router-dom';

export default function AGTable() {
    const params = useParams();
    const { model } = params as {
        model: ModelType;
    };
    const dispatch = useDispatch();
    const { list } = useSelector((state: DefaultRootStateProps) => state.models);

    const cols: ColDef<AGTableModelType>[] = get_columns_by_title(model);

    const rows: any[] = list[model];

    React.useEffect(() => {
        dispatch(fetchListByModel({ model }));
    }, [dispatch, model]);
    return (
        <MainCard content={false} title={model}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <AGTableChild cols={cols} rows={rows} />
            </Paper>
        </MainCard>
    );
}
