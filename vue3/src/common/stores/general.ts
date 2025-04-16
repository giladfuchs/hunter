import { defineStore } from 'pinia';
import axios from '@/common/utils/axios';
import { useCustomizerStore } from '@/common/stores/customizer';
import { type DBQuery, type FilterQuery, ModelType } from '@/common/types';
import { useAuthStore } from '@/common/stores/auth';
import { router } from '@/common/router';

const auth_store = useAuthStore();
export const useGeneralStore = defineStore({
  id: 'general',
  state: () => ({
    list: {
      [ModelType.teacher]: [],
      [ModelType.student]: [],
      [ModelType.assignment]: []
    }
  }),
  getters: {
    input_form_to_data:
      () =>
      (form: any): {} => {
        return Object.assign(
          {},
          ...Object.keys(form)
            .filter((key: string) => form[key].value !== undefined && form[key].value != '')
            .map((key: string) => {
              return { [key]: typeof form[key].value === 'string' ? form[key].value.trim() : form[key].value };
            })
        );
      }
  },
  actions: {
    after_success(model: ModelType, is_add: boolean) {
      const customizer = useCustomizerStore();

      customizer.success_message = `success to ${is_add ? 'create' : 'edit'} ${model}`;
      customizer.success_snackbar = true;
    },
    after_delete(model: string) {
      const customizer = useCustomizerStore();

      customizer.success_message = `success to delete ${model} `;
      customizer.success_snackbar = true;
    },
    async fetch_or_delete_rows(model: ModelType, data: FilterQuery | {} = {}) {
      try {
        const response = await axios.post(`${model}`, Object.keys(data).length === 0 ? undefined : data);
        if ('delete_rows' in data && data.delete_rows) {
          this.after_delete(model);
          if (model === ModelType.assignment) window.location.reload();
          else await router.push(`/${ModelType.student}`);
        } else {
          let res_data = response.data;
          this.list[model] = res_data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async create_update_row_input_form(form: any, model: ModelType, url: string, is_add: boolean) {
      const data: any = this.input_form_to_data(form);
      if (model.includes(ModelType.student)) data.teacher_id = auth_store.user_id;
      if (model.includes(ModelType.assignment)) {
        data.teacher_id = auth_store.user_id;
        data.student_id = auth_store.student_id;
      }
      return await this.create_update_row(data, model, url, is_add);
    },
    async create_update_row(data: any, model: ModelType, url: string, is_add: boolean) {
      try {
        const response: any = await axios.post(`${model}/${url}`, data);
        this.after_success(model, is_add);

        return response;
      } catch (error) {
        throw error;
      }
    }
  }
});
