<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import type { inputFilters } from '@/common/types/form/input';
import { ModelType } from '@/common/types';

interface Props {
  controls: inputFilters;
  type: ModelType;
  is_add: boolean;
}

const props = defineProps<Props>();

const controls = ref<inputFilters>(props.controls);
</script>

<template>
  <v-fab-transition style="transition: all 0.81s ease">
    <v-col cols="4" sm="4">
      <UiParentCard :title="props.is_add ? $t(`form_header_add_${props.type}`) : $t(`form_header_edit_${props.type}`)">
        <v-col cols="12" style="display: flex; flex-direction: row; margin: -1rem -1rem" v-for="field in Object.keys(controls)">
          <v-textarea
            v-if="controls[field].type === 'textarea'"
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
        <v-col cols="12" class="d-flex align-center justify-center">
          <v-btn color="primary" @click="$emit('sendForm', controls)">{{ $t('form_send_button') }}</v-btn>
        </v-col>
      </UiParentCard>
    </v-col>
  </v-fab-transition>
</template>
