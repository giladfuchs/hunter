import { createAsyncThunk, createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { FilterQuery, ModelType } from '../types';
import { API, fetch_or_delete_rows } from '../utils/axios';

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

export const fetchListByModel = createAsyncThunk(
    'models/fetch_or_delete_rows',
    async (params: { model: ModelType; data?: FilterQuery }, thunkAPI) => {
        const { model, data = {} } = params;
        const res = await fetch_or_delete_rows(model, data);
        return { model, res };
    }
);

export const createOrUpdateRow = createAsyncThunk(
    'models/create_or_update_row',
    async ({ model, data, id }: { model: ModelType; data: Record<string, any>; id: string }) => {
        const response = await API.post(`${model}/${id}`, data);
        return response.data;
    }
);

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
                        res: any[];
                    }>
                ) => {
                    state.loading = false;
                    state.list[action.payload.model] = action.payload.res;
                }
            )
            .addCase(fetchListByModel.rejected, (state: ModelState, action: any) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch model data';
            });
    }
});

export default modelSlice.reducer;
