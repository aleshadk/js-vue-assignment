<template>
  <div
    class="wrapper"
    :class="{ 'shadowed': active }"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <!-- TODO: how can I avoid direct props drilling? May be I can use smth like v-bind here-->
    <TextElementComponent v-if="type === 'text'" :value="props.value" />
    <ImageElementComponent v-if="type === 'img'" :src="props.src" :size="props.size" />

    <div class="control-panel" v-if="active" @mouseover="handleMouseOverControlPanel" @mouseout="handleMouseOutControlPanel">
      <CmsNewItemControl />
    </div>
  </div>

</template>

<script setup lang="ts">
import TextElementComponent from './text-element/TextElementComponent.vue'
import ImageElementComponent from './image-element/ImageElementComponent.vue'
import type { BlockItem } from '@/components/PagePreviewModel'
import { ref, computed } from 'vue'
import CmsNewItemControl from '../cms-controls/CmsControlPanel.vue'

const active = computed(() => elHovered.value || controlPanelHovered.value)

const elHovered = ref(false);
function handleMouseOver(event: MouseEvent) {
  elHovered.value = true;
}

function handleMouseOut(event: MouseEvent) {
  if (!event.relatedTarget || !event.relatedTarget.closest('.wrapper')) {
    elHovered.value = false;
  }
}

const controlPanelHovered = ref(false);
function handleMouseOverControlPanel() {
  controlPanelHovered.value = true;

}

function handleMouseOutControlPanel() {
  controlPanelHovered.value = false;
}

const props = defineProps<BlockItem>()
</script>
<style scoped>
  .wrapper {
    position: relative;
    display: flex;
    height: auto;
  }

  .shadowed {
    box-shadow: 0 0 0 1px var(--color-sky-600);;
    border-radius: 6px;
  }

  .control-panel {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
  }
</style>
