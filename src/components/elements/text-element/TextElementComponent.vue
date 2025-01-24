<template>
  <p class="my-4 w-full" :class="aligmentCssClass">{{ props.value }}</p>
</template>

<script setup lang="ts">
import type { TextBlockAligment, TextBlockItem } from '@/components/PagePreviewModel'
import { ref, watch } from 'vue'
const alligmentToCssClassMapping: Record<TextBlockAligment, string> = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
}

const props = defineProps<Omit<TextBlockItem, 'type'>>()
const aligmentCssClass = ref('')

console.log(props.aligment);

watch(
  () => props.aligment,
  aligment => {
    debugger;
    aligmentCssClass.value = alligmentToCssClassMapping[aligment]
  },
)
</script>

<style scoped></style>
