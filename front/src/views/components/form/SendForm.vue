<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import type { inputFilters } from '@/common/types/form/input';
import { FilterFetchType } from '@/common/types';

interface Props {
  controls: inputFilters;
  type: FilterFetchType;
  no_button?: boolean;
}

const props = defineProps<Props>();

const controls = ref<inputFilters>(props.controls);
</script>

<template>
  <v-fab-transition style="transition: all 0.81s ease">
    <v-col :cols="props.no_button ? 12 : 4" :sm="props.no_button ? 12 : 4">
      <UiParentCard :title="props.no_button ? undefined : $t(`form_header_${props.type}`)">
        <v-col cols="12" style="display: flex; flex-direction: row; margin: -1rem -1rem" v-for="field in Object.keys(controls)">
          <v-checkbox
            v-if="typeof controls[field].value === 'boolean'"
            v-model="controls[field].value"
            :label="$t(field)"
            color="primary"
            hide-details
          ></v-checkbox>
          <v-textarea
            v-else-if="controls[field].type === 'textarea'"
            v-model="controls[field].value"
            variant="outlined"
            color="primary"
            name="input-7-4"
            :label="$t(field)"
            rows="4"
          ></v-textarea>

          <v-text-field
            style="width: 100%"
            v-else-if="controls[field].options === undefined"
            color="primary"
            clearable
            :type="controls[field].type"
            v-model="controls[field].value"
            :label="$t(field)"
            variant="outlined"
          ></v-text-field>

          <v-autocomplete
            v-else
            style="width: 100%"
            v-model="controls[field].value"
            :label="$t(field)"
            :items="controls[field].options"
            variant="outlined"
            color="primary"
            dense
          />
        </v-col>
        <v-col v-if="!props.no_button" cols="12" class="d-flex align-center justify-center">
          <v-btn color="primary" @click="$emit('sendForm', controls)">{{ $t(`form_button_${props.type}`) }}</v-btn>
        </v-col>
      </UiParentCard>
    </v-col>
  </v-fab-transition>
</template>
