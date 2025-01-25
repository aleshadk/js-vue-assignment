<template>
  <a-empty
    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
    :image-style="{
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
    }"
  >
    <template #description>
      <span> This page is empty </span>
    </template>
    <a-button @click="() => emit('addNewBlock')" type="primary"
      >Add your first block here</a-button
    >
  </a-empty>
</template>

<script setup lang="ts">
const emit = defineEmits(['addNewBlock'])
</script>
