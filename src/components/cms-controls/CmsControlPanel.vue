<template>
  <div class="main">
    <a-button @click="emit('add')">Insert new block above</a-button>
    <a-button @click="emit('edit')" :icon="h(EditOutlined)" />
    <a-button @click="emit('delete')" danger :icon="h(DeleteOutlined)" />
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['add', 'edit', 'delete']);

</script>

<style scoped>
  .main {
    display: flex;
    gap: 8px;
    background-color: white;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    padding: 8px 10px;
    border-radius: 8px;
  }
</style>


