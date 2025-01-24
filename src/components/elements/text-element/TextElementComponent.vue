<template>
  <p class="my-4 w-full" :class="aligmentCssClass">{{ props.model.value }}</p>
</template>

<script setup lang="ts">
import type { TextBlockAligment, TextBlockItem } from '@/components/PagePreviewModel'
import { ref, watch } from 'vue'
const alligmentToCssClassMapping: Record<TextBlockAligment, string> = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
}

const props = defineProps<{model: TextBlockItem}>()
const aligmentCssClass = ref('')

watch(
  () => props.model.aligment,
  aligment => aligmentCssClass.value = alligmentToCssClassMapping[aligment],
  { immediate: true }
)
</script>

<style scoped></style>
