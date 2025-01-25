import { generateId } from '@/utils/generateRandomId';
import { type BlockType, type TextBlockItem, type ImageBlockItem, type BlockItem } from './../components/PagePreviewModel';
import { h, type VNode } from 'vue';
import TextCmsBlockForm from '@/components/elements/text-element/TextCmsBlockForm.vue';
import ImageCmsBlockForm from '@/components/elements/image-element/ImageCmsBlockForm.vue';

type BlockMapping = {
  [K in BlockType]: {
    createEmptyModel(): Extract<BlockItem, { type: K }>;
    resolveFormComponent(data: Extract<BlockItem, { type: K }>): VNode;
  }
}

const mapping: BlockMapping = {
  ['text']: {
    createEmptyModel(): TextBlockItem {
      return {
        type: 'text',
        value: 'This is a text',
        aligment: 'center',
        id: generateId()
      }
    },
    resolveFormComponent(data: TextBlockItem): VNode {
      return h(TextCmsBlockForm, data);
    }
  },
  ['img']: {
    createEmptyModel(): ImageBlockItem {
      return {
        type: 'img',
        src: '/ny.png',
        alt: 'this is alt',
        id: generateId()
      }
    },
    resolveFormComponent(data: ImageBlockItem): VNode {
      return h(ImageCmsBlockForm, data);
    }
  }
}

export function createCmsBlockModel(type: BlockType): BlockItem {
  return mapping[type].createEmptyModel();
}

export function resolveFormComponent(data: BlockItem): VNode {
  // TODO: can I do it without switch case? 
  switch (data.type) {
    case 'text':
      return mapping.text.resolveFormComponent(data);
    case 'img':
      return mapping.img.resolveFormComponent(data);
  }
}
