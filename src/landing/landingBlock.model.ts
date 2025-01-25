interface BaseBlock {
  id: string;
}

export type BlockType = 'text' | 'img';
export type TextBlockAligment = 'left' | 'center' | 'right';

export interface TextBlockModel extends BaseBlock {
  type: 'text';
  value: string;
  aligment: TextBlockAligment;
}

export interface ImageBlockModel extends BaseBlock {
  type: 'img';
  src: string;
  alt: string;
}

export type LandingBlockModel = TextBlockModel | ImageBlockModel;