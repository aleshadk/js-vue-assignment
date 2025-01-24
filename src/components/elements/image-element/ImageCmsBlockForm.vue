<template>
  <div class="flex flex-col gap-4">
    <FormControlWrapper label="Image URL">
      <a-input v-model:value="srcValue" placeholder="Image URL" />
    </FormControlWrapper>
    <FormControlWrapper label="Also you can use some stock images">
      <a-select style="width: 100%" @select="srcValue = $event">
        <a-select-option value="/ny.png">New York</a-select-option>
        <a-select-option value="/couple.png">Couple</a-select-option>
        <a-select-option value="/ai.png">AI</a-select-option>
      </a-select>
    </FormControlWrapper>
    <FormControlWrapper label="Alt">
      <a-input v-model:value="altValue" placeholder="Alt" />
    </FormControlWrapper>
  </div>
</template>
<script lang="ts" setup>
import FormControlWrapper from '@/components/cms/cms-forms/FormControlWrapper.vue'
import type { ImageBlockItem } from '@/components/PagePreviewModel'
import { useCmsFormStore } from '@/stores/cmsBlocksStore'
import { ref } from 'vue'

const props = defineProps<ImageBlockItem>()
const srcValue = ref<string>(props.src)
const altValue = ref(props.alt)

const cmsFormStore = useCmsFormStore()

cmsFormStore.updateSubmitActiveForm(() => {
  return {
    id: props.id,
    type: 'img',
    src: srcValue.value,
    alt: altValue.value,
  } as ImageBlockItem
})
</script>
