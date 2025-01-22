export interface TextBlockItem {
  type: 'text';
  value: string;
}

export interface ImageBlockItem {
  type: 'img';
  src: string;
  size: 'small' | 'medium' | 'large';
}

export type BlockItem = TextBlockItem | ImageBlockItem;