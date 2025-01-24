<template>
  <div>
    <a-textarea
      v-model:value="textValue"
      placeholder="Autosize height with minimum and maximum number of lines"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
    <a-segmented v-model:value="textAligment" :options="aligmentOptions" />

  </div>
</template>
<script lang="ts" setup>
import type { TextBlockAligment, TextBlockItem } from '@/components/PagePreviewModel';
import { ref } from 'vue';
const props = defineProps<TextBlockItem>();
const aligmentOptions: TextBlockAligment[] = ['left', 'center', 'right'];
const textValue = ref<string>(props.value);
const textAligment = ref(props.aligment);


</script>