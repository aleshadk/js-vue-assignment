<template>
  <div
    class="wrapper"
    :class="{ shadowed: props.showControlPanel }"
    @mouseenter="handleElementMouseEnter"
    @mouseleave="handleElementMouseLeave"
  >
    <TextBlock v-if="props.blockModel.type === 'text'" :model="props.blockModel" />
    <ImageBlock v-if="props.blockModel.type === 'img'" :model="props.blockModel" />

    <div
      class="control-panel"
      v-if="props.showControlPanel"
      @mouseenter="handleControlPanelMouseEnter"
      @mouseleave="handleControlPanelMouseLeave"
    >
      <LandingBlockCmsControlsPanel
        @add="() => emit('add')"
        @edit="() => emit('edit')"
        @dublicate="() => emit('dublicate')"
        @delete="() => emit('delete')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LandingBlockModel } from '@/landing/landingBlock.model'
import { useLandingBLockHover } from './useLandingBlockHover'
import { watch } from 'vue'
import TextBlock from '@/landing/blocks/TextBlock.vue'
import ImageBlock from '@/landing/blocks/ImageBlock.vue'
import LandingBlockCmsControlsPanel from './LandingBlockCmsControlsPanel.vue'
const props = defineProps<{ blockModel: LandingBlockModel; showControlPanel: boolean }>()

const emit = defineEmits<{
  (e: 'focusChanged', isFocused: boolean): void
  (e: 'add'): void
  (e: 'edit'): void
  (e: 'dublicate'): void
  (e: 'delete'): void
}>()

const {
  isActive,
  handleElementMouseEnter,
  handleElementMouseLeave,
  handleControlPanelMouseEnter,
  handleControlPanelMouseLeave,
  reset,
} = useLandingBLockHover()

watch(
  () => props.showControlPanel,
  (value) => {
    if (!value) {
      reset()
    }
  },
)

watch(isActive, (value) => {
  console.log(props.blockModel.id, 'focus changed', value)
  emit('focusChanged', value)
})
</script>
<style scoped>
.wrapper {
  position: relative;
  display: flex;
  height: auto;
}

.shadowed {
  box-shadow: 0 0 0 1px var(--color-sky-600);
  border-radius: 6px;
}

.control-panel {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  z-index: 10;
}
</style>
