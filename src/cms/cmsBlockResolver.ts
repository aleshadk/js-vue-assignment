import { generateId } from '@/utils/generateRandomId';
import { type BlockType, type TextBlockModel, type ImageBlockModel, type LandingBlockModel } from '../landing/landingBlock.model';
import { h, type VNode } from 'vue';
import TextCmsBlockForm from '@/cms/landing-blocks-cms-forms/TextCmsBlockForm.vue';
import ImageCmsBlockForm from '@/cms/landing-blocks-cms-forms/ImageCmsBlockForm.vue';

type BlockMapping = {
  [K in BlockType]: {
    createEmptyModel(): Extract<LandingBlockModel, { type: K }>;
    resolveFormComponent(data: Extract<LandingBlockModel, { type: K }>): VNode;
  }
}

const mapping: BlockMapping = {
  ['text']: {
    createEmptyModel(): TextBlockModel {
      return {
        type: 'text',
        value: 'This is a text',
        aligment: 'center',
        id: generateId()
      }
    },
    resolveFormComponent(data: TextBlockModel): VNode {
      return h(TextCmsBlockForm, data);
    }
  },
  ['img']: {
    createEmptyModel(): ImageBlockModel {
      return {
        type: 'img',
        src: '/ny.png',
        alt: 'this is alt',
        id: generateId()
      }
    },
    resolveFormComponent(data: ImageBlockModel): VNode {
      return h(ImageCmsBlockForm, data);
    }
  }
}

export function createCmsBlockModel(type: BlockType): LandingBlockModel {
  return mapping[type].createEmptyModel();
}

export function resolveFormComponent(data: LandingBlockModel): VNode {
  // TODO: can I do it without switch case? 
  switch (data.type) {
    case 'text':
      return mapping.text.resolveFormComponent(data);
    case 'img':
      return mapping.img.resolveFormComponent(data);
  }
}
