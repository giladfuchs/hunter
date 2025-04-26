import type { inputFilters } from '@/common/types';
import { array_to_dict, deep_copy_stringify } from '@/common/utils/transformation/index';
import _ from 'lodash';

export const create_form_fields = (source: inputFilters, target: inputFilters): inputFilters => {
  if (_.isEmpty(target)) return source;
  const source_res = deep_copy_stringify(source) as inputFilters;
  return array_to_dict(
    Object.keys(source_res).map((key: string) => {
      return target[key] !== undefined ? { ...source_res[key], id: key, value: target[key] } : { ...source_res[key] };
    })
  ) as inputFilters;
};
