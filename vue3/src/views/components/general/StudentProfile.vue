<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import { PhoneIcon, SchoolIcon } from 'vue-tabler-icons';
import { ModelType, type Student } from '@/common/types';
import { useGeneralStore } from '@/common/stores/general';

interface Props {
  student: Student;
}

const store = useGeneralStore();

const props = defineProps<Props>();

const student = computed(() => props.student);
const delete_row = async () => {
  await store.fetch_or_delete_rows(ModelType.student, {
    query: [{ key: 'id', value: student.value.id, opt: 'eq' }],
    delete_rows: true
  });
};
const items = ref([
  { text: 'Phone', icon: PhoneIcon, divider: true },
  { text: 'Grade', icon: SchoolIcon, divider: true }
]);
</script>
<template>
  <v-col cols="6" lg="4">
    <v-card variant="flat">
      <v-card variant="outlined">
        <v-list lines="two">
          <v-list-item>
            <template v-slot:title>
              <div class="d-flex flex-column flex-md-row align-start align-md-center justify-space-between gap-2 ml-14">
                <h5 class="text-subtitle-1 mt-1">{{ student.name }}</h5>
                <v-btn :to="`/assignment/add`" icon color="secondary" variant="text" density="compact" class="ml-2">
                  {{ $t('form_header_add_assignment') }}
                </v-btn>
                <v-btn :to="`/student/${student.id}`" icon variant="text" size="x-small" density="compact">
                  <EditIcon size="20" />
                </v-btn>

                <v-btn icon variant="text" size="x-small" density="compact" @click="delete_row">
                  <TrashIcon size="20" />
                </v-btn>
              </div>
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-text>
          <v-list>
            <template v-for="(item, i) in items">
              <v-list-item active-color="primary" :value="item" class="py-4">
                <template v-slot:prepend>
                  <component :is="item.icon" size="20" stroke-width="1.5" class="mr-2" />
                </template>

                <v-list-item-title class="text-subtitle-1">
                  {{ item.text }}
                </v-list-item-title>

                <template v-slot:append>
                  <span class="text-subtitle-2 text-disabled font-weight-medium">{{ student[item.text.toLowerCase()] }}</span>
                </template>
              </v-list-item>
              <v-divider v-if="item.divider"></v-divider>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card>
  </v-col>
</template>
