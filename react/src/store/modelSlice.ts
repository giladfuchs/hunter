import { createAsyncThunk, createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ModelType } from '../types';
import { fetch_or_delete_rows } from '../utils/axios';

interface ModelState {
    list: {
        [key in ModelType]: any[];
    };
    loading: boolean;
    error: string | null;
}

const initialState: ModelState = {
    list: {
        [ModelType.teacher]: [],
        [ModelType.student]: [],
        [ModelType.assignment]: []
    },
    loading: false,
    error: null
};

export const fetchListByModel = createAsyncThunk('models/fetch_or_delete_rows', async (model: ModelType) => {
    const data = await fetch_or_delete_rows(model);
    return { model, data };
});

const modelSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<ModelState>) => {
        builder
            .addCase(fetchListByModel.pending, (state: ModelState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchListByModel.fulfilled,
                (
                    state: any,
                    action: PayloadAction<{
                        model: ModelType;
                        data: any[];
                    }>
                ) => {
                    state.loading = false;
                    state.list[action.payload.model] = action.payload.data;
                }
            )
            .addCase(fetchListByModel.rejected, (state: ModelState, action: any) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch model data';
            });
    }
});

export default modelSlice.reducer;
