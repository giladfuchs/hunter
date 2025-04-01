<script setup>

const props = defineProps({
  params: String,
});

</script>
<template>

  <v-btn icon variant="flat" size="large" rounded="md" class="text-secondary" color="lightsecondary"  :to="`/student/view/${props.params.value}`">
    <EyeIcon size="18" />
  </v-btn>

</template>


