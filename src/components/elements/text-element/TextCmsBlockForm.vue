<template>
  <div class="flex flex-col gap-4">
    <FormControlWrapper label="Paragraph content">
      <a-textarea
        v-model:value="textValue"
        placeholder="Paragraph content"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
    </FormControlWrapper>
    <FormControlWrapper label="Aligment">
      <a-segmented v-model:value="textAligment" :options="aligmentOptions"  />
    </FormControlWrapper>
  </div>
</template>
<script lang="ts" setup>
import FormControlWrapper from '@/components/cms/cms-forms/FormControlWrapper.vue';
import type { TextBlockAligment, TextBlockItem } from '@/components/PagePreviewModel';
import { useCmsFormStore } from '@/stores/cmsBlocksStore';
import { ref } from 'vue';

const props = defineProps<TextBlockItem>();
const aligmentOptions: TextBlockAligment[] = ['left', 'center', 'right'];
const textValue = ref<string>(props.value);
const textAligment = ref(props.aligment);

const cmsFormStore = useCmsFormStore();

cmsFormStore.updateSubmitActiveForm(() => {
  return {
    id: props.id,
    type: 'text',
    value: textValue.value,
    aligment: textAligment.value
  } as TextBlockItem
});

</script>