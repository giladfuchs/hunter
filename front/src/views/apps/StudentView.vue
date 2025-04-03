<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { FilterFetchType } from '@/common/types';

import { useFilterFetchStore } from '@/common/stores/apps/filter_fetch';
import AssignmentCards from '@/views/components/shared/AssignmentCards.vue';
import { useAuthStore } from '@/common/stores/auth';
import StudentProfile from '@/views/components/shared/StudentProfile.vue';

const router = useRouter();
const store = useFilterFetchStore();
const auth_store = useAuthStore();

const route = useRoute();

const student_id = computed<string>(() => route.params.id as string);

const init = async () => {
  await store.fetch_rows(FilterFetchType.student, { key: 'id', value: student_id.value, opt: 'eq' });
  store.list[FilterFetchType.assignment] = store.list[FilterFetchType.student][0].assignments;
  auth_store.student_id = store.list[FilterFetchType.student][0].id;
};

onMounted(async () => {
  await init();
});
const student = computed(() => store.list[FilterFetchType.student][0]);
</script>
<template>
  <v-row>
    <v-col class="d-flex flex-row mt-2 justify-space-around" cols="12" sm="12">
      <AssignmentCards :assignments="student.assignments" />
      <StudentProfile :student="student" />
      Í
    </v-col>
  </v-row>
</template>
