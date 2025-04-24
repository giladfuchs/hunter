<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { ModelType, type Student } from '@/common/types';

import AssignmentCards from '@/views/components/general/AssignmentCards.vue';
import { useAuthStore } from '@/common/stores/auth';
import StudentProfile from '@/views/components/general/StudentProfile.vue';
import { useGeneralStore } from '@/common/stores/general';

const router = useRouter();
const store = useGeneralStore();
const auth_store = useAuthStore();

const route = useRoute();
const init = async () => {
  await store.fetch_or_delete_rows(ModelType.student, { query: [{ key: 'id', value: student_id.value, opt: 'eq' }] });
  store.list[ModelType.assignment] = student.value.assignments as [];
  auth_store.student_id = student.value.id;
};

onMounted(async () => {
  await init();
});
const   const [hasFetched, setHasFetched] = React.useState(false);
student_id = computed<string>(() => route.params.id as string);
const student = computed<Student>(() => store.list[ModelType.student][0]);
</script>
<template>
  <v-row v-if="student">
    <v-col class="d-flex flex-row mt-2 justify-space-around" cols="12" sm="12">
      <AssignmentCards :assignments="student.assignments" />
      <StudentProfile :student="student" />
    </v-col>
  </v-row>
</template>
