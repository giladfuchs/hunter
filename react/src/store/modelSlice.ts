import { createAsyncThunk, createSlice, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Assignment, FilterQuery, ModelType, Student, Teacher } from '../types';
import API from '../utils/axios';

export interface ModelList {
    teacher: Teacher[];
    student: Student[];
    assignment: Assignment[];
}

export interface ModelState {
    list: ModelList;
    user_id: number;
    student_id: number;
}

const initialState: ModelState = {
    list: {
        [ModelType.teacher]: [],
        [ModelType.student]: [],
        [ModelType.assignment]: []
    },
    user_id: 0,
    student_id: 0
};

export const fetchRowsByModel = createAsyncThunk('models/fetch_rows', async (params: { model: ModelType; data?: FilterQuery }) => {
    const { model, data = {} } = params;
    const response = await API.post(`/${model}`, data);
    return { model, data: response.data };
});

export const createOrUpdateRow = createAsyncThunk(
    'models/create_or_update_row',
    async ({ model, data, id }: { model: ModelType; data: Record<string, any>; id: string }) => {
        const response = await API.post(`${model}/${id}`, data);
        return response.data;
    }
);

export const deleteRowById = createAsyncThunk('models/delete_row', async ({ model, id }: { model: ModelType; id: string | number }) => {
    const data = { query: [{ key: 'id', value: id, opt: 'eq' }] };
    await API.delete(`/${model}`, { data });
    return { model, id };
});

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
        builder.addCase(fetchRowsByModel.fulfilled, (state, action) => {
            state.list[action.payload.model] = action.payload.data;
        });
    }
});

export const { setAssignments, setUserAndStudentId } = modelSlice.actions;
export default modelSlice.reducer;
