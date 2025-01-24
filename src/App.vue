<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-200">
    <RouterView />
  </div>
</template>

<style scoped>
  .layout { 
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
  }
</style>