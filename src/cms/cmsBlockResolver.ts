import { generateId } from '@/utils/generateRandomId';
import { type BlockType, type TextBlockItem, type ImageBlockItem } from './../components/PagePreviewModel';

const mapping = {
  ['text']: {
    createEmptyModel(): TextBlockItem {
      return {
        type: 'text',
        value: 'This is a text',
        id: generateId()
      }
    }
  },
  ['img']: {
    createEmptyModel(): ImageBlockItem {
      return {
        type: 'img',
        src: 'this is src',
        size: 'large',
        id: generateId()
      }
    }
  }
}

export function createCmsBlockModel(type: BlockType) {
  return mapping[type].createEmptyModel();
}

