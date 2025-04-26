import { createAsyncThunk, createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Assignment, FilterQuery, ModelType, Student, Teacher } from '../types';
import { API, fetch_or_delete_rows } from '../utils/axios';

// ==============================|| TYPES ||============================== //

export interface ModelList {
    teacher: Teacher[];
    student: Student[];
    assignment: Assignment[];
}

export interface ModelState {
    list: ModelList;
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
    async (params: { model: ModelType; data?: FilterQuery }) => {
        const { model, data = {} } = params;
        const res = await fetch_or_delete_rows(model, data);
        return { model, res };
    }
);

// Create or Update Row (POST)
export const createOrUpdateRow = createAsyncThunk(
    'models/create_or_update_row',
    async ({ model, data, id }: { model: ModelType; data: Record<string, any>; id: string }) => {
        const response = await API.post(`${model}/${id}`, data);
        return response.data;
    }
);

export const deleteRowById = createAsyncThunk('models/delete_row', async ({ model, id }: { model: ModelType; id: string | number }) => {
    const data = {
        query: [{ key: 'id', value: id, opt: 'eq' }],
        delete_rows: true
    };

    const res = await fetch_or_delete_rows(model, data);
    return { model, id };
});

// ==============================|| SLICE ||============================== //

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
            .addCase(fetchListByModel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchListByModel.fulfilled, (state, action) => {
                state.loading = false;
                state.list[action.payload.model] = action.payload.res;
            })
            .addCase(fetchListByModel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch model data';
            })

            .addCase(createOrUpdateRow.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrUpdateRow.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createOrUpdateRow.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to create/update model data';
            })

            .addCase(deleteRowById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRowById.fulfilled, (state) => {
                state.loading = false;
                // ❗ We do NOT modify the list here, because user manually navigates after delete
            })
            .addCase(deleteRowById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to delete row';
            });
    }
});

// ==============================|| EXPORTS ||============================== //

export const { setAssignments, setUserAndStudentId } = modelSlice.actions;
export default modelSlice.reducer;
