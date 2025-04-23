<script setup lang="ts">
const props = defineProps({
  title: String
});
</script>

<template>
  <v-card variant="outlined" elevation="0" class="withbg">
    <v-card-item v-if="title">
      <div class="d-sm-flex align-center justify-space-between">
        <v-card-title class="text-center">{{ title }}</v-card-title>
        <slot name="action"></slot>
      </div>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
