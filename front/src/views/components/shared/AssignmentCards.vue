<script setup lang="ts">
import UiParentCard from '@/views/components/shared/UiParentCard.vue';
import UiChildCard from '@/views/components/shared/UiChildCard.vue';
import { type Assignment, FilterFetchType } from '@/common/types';
import { useGeneralStore } from '@/common/stores/apps/general';

interface Props {
  assignments: [Assignment];
}
const store = useGeneralStore();

const props = defineProps<Props>();

const delete_row = async (assignment_id: number) => {
  await store.delete_row(FilterFetchType.assignment, { key: 'id', value: assignment_id, opt: 'eq' });
};
</script>

<template>
  <v-row>
    <v-col cols="12" lg="6">
      <UiParentCard title="Assignments">
        <UiChildCard v-for="(assignment, i) in props.assignments" :title="assignment.title" class="mb-4">
          <v-card variant="outlined" class="bg-gray100">
            <v-card-text> {{ assignment.detail }}}</v-card-text>
          </v-card>
          <div class="d-flex justify-center mt-2">
            <v-btn icon variant="text" size="x-small" density="compact" @click="delete_row(assignment.id)">
              <TrashIcon size="20" />
            </v-btn>
            <v-divider></v-divider>
            <v-btn icon variant="text" size="x-small" density="compact" class="mr-15" :to="`/assignment/${assignment.id}`">
              <EditIcon size="20" />
            </v-btn>
          </div>
        </UiChildCard>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
