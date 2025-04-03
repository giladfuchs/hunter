<script setup lang="ts">
import AssignmentsHover from '@/views/components/shared/AssignmentsHover.vue';

const props = defineProps({
  params: String
});
</script>

<template>
  <v-menu open-on-hover offset-y>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">Hover me</v-btn>
    </template>

    <v-card>
      <AssignmentsHover :assignments="props.params.value" />
    </v-card>
  </v-menu>
</template>
