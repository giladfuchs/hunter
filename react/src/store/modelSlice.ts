import { createAsyncThunk, createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Assignment, FilterQuery, ModelType } from '../types';
import { API, fetch_or_delete_rows } from '../utils/axios';

interface ModelState {
    list: {
        [key in ModelType]: any[];
    };
    loading: boolean;
    error: string | null;
    user_id: number;
    student_id: number;
}

const initialState: ModelState = {
    list: {
        [ModelType.teacher]: [],
        [ModelType.student]: [],
        [ModelType.assignment]: []
    },
    loading: false,
    error: null,
    user_id: 0,
    student_id: 0
};

export const fetchListByModel = createAsyncThunk(
    'models/fetch_or_delete_rows',
    async (
        params: {
            model: ModelType;
            data?: FilterQuery;
        },
        thunkAPI
    ) => {
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
    reducers: {
        setAssignments(state, action: PayloadAction<Assignment[]>) {
            state.list[ModelType.assignment] = action.payload;
        },
        setUserAndStudentId(
            state,
            action: PayloadAction<{
                user_id: number;
                student_id: number;
            }>
        ) {
            state.user_id = action.payload.user_id;
            state.student_id = action.payload.student_id;
        }
    },
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
export const { setAssignments, setUserAndStudentId } = modelSlice.actions;

export default modelSlice.reducer;
