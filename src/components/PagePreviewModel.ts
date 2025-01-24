interface BaseItem {
  id: string;
}

export type BlockType = 'text' | 'img'; 
export type TextBlockAligment = 'left' | 'center' | 'right';

export interface TextBlockItem extends BaseItem{
  type: 'text';
  value: string;
  aligment: TextBlockAligment;
}

export interface ImageBlockItem extends BaseItem {
  type: 'img';
  src: string;
  alt: string;
}

export type BlockItem = TextBlockItem | ImageBlockItem;