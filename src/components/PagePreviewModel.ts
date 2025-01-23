interface BaseItem {
  id: string;
}

export interface TextBlockItem extends BaseItem{
  type: 'text';
  value: string;
}

export interface ImageBlockItem extends BaseItem {
  type: 'img';
  src: string;
  size: 'small' | 'medium' | 'large';
}

export type BlockItem = TextBlockItem | ImageBlockItem;