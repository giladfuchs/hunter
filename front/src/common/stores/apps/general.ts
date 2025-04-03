import { defineStore } from 'pinia';
import axios from '@/common/utils/axios';
import { useCustomizerStore } from '@/common/stores/customizer';
import type { FilterFetchType } from '@/common/types';
import { useAuthStore } from '@/common/stores/auth';
import { router } from '@/common/router';

const auth_store = useAuthStore();
export const useGeneralStore = defineStore({
  id: 'general',
  getters: {
    inputFilters_to_data:
      () =>
      (form: any, other_params = {}, exclude_field: string[] = []): number => {
        return Object.assign(
          other_params,
          ...Object.keys(form)
            .filter((key: string) => form[key].value !== undefined && form[key].value != '' && !exclude_field.includes(key))
            .map((key: string) => {
              return { [key]: typeof form[key].value === 'string' ? form[key].value.trim() : form[key].value };
            })
        );
      }
  },
  actions: {
    async after_success(key_success: string) {
      const customizer = useCustomizerStore();

      customizer.success_message = `success create ${key_success}`;
      customizer.success_snackbar = true;
    },
    async after_delete(model: string) {
      const customizer = useCustomizerStore();

      customizer.success_message = `success delete ${model}  }`;
      customizer.success_snackbar = true;
    },

    async create_update_row_inputFilters(
      form: any,
      model: FilterFetchType | string,
      key_success: string | undefined = undefined,
      other_params = {},
      exclude_field: string[] = []
    ) {
      const data: any = this.inputFilters_to_data(form, other_params, exclude_field);
      if (model.includes('student')) data.teacher_id = auth_store.user_id;
      if (model.includes('assignment')) {
        data.teacher_id = auth_store.user_id;
        data.student_id = auth_store.student_id;
      }
      return await this.create_update_row(data, model, key_success);
    },
    async create_update_row(data: any, model: FilterFetchType | string, key_success: string | undefined = undefined) {
      try {
        if (!key_success) key_success = model;
        const response: any = await axios.post(`${model}`, data);
        this.after_success(key_success);

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async delete_row(model: FilterFetchType, data: any = {}) {
      try {
        const response = await axios.post(`${model}/delete`, Object.keys(data).length === 0 ? undefined : data);
        await this.after_delete(model);
        if (model === 'assignment') window.location.reload();
        else await router.push('/student');
      } catch (error) {
        console.log(error);
      }
    }
  }
});
