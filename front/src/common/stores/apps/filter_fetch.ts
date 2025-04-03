import { defineStore } from 'pinia';
// project imports
import axios from '@/common/utils/axios';
import { FilterFetchType } from '@/common/types';

export const useFilterFetchStore = defineStore({
  id: 'filter_fetch',
  state: () => ({
    fetch_menu: true,
    modal: false,

    list: {
      [FilterFetchType.teacher]: [],
      [FilterFetchType.student]: [],
      [FilterFetchType.assignment]: []
    }
  }),
  persist: {
    enabled: true
  },
  getters: {},
  actions: {
    async fetch_rows(model: FilterFetchType, data: any = {}) {
      try {
        console.log(data);

        const response = await axios.post(`${model}/filter`, Object.keys(data).length === 0 ? undefined : data);
        let res_data = response.data;
        this.list[model] = res_data;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
