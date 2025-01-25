import { dublicateArrayElement } from './arrayDublicate';
import { describe, it, expect } from 'vitest';

interface TestItem {
  id: number;
  value: number;
}

function createTestData(): TestItem[] {
  return [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 }
  ];
}

const multiplyByTwoModifier = (x: TestItem): TestItem => ({ ...x, value: x.value * 2 });


describe('dublicateArrayElement', () => {
  it('should return the original array if no elements match the predicate', () => {
    const data = createTestData();
    const result = dublicateArrayElement(data, multiplyByTwoModifier, x => x.id === 4);
    expect(result).toEqual([
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 }
    ]);
  });

  it('should duplicate elements that match the predicate', () => {
    const data = createTestData();
    const result = dublicateArrayElement(data, multiplyByTwoModifier, x => x.id === 2);
    expect(result).toEqual([
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 2, value: 40 },
      { id: 3, value: 30 }
    ]);
  });

  it('should apply the modifier to the duplicated elements', () => {
    const data = createTestData();
    const result = dublicateArrayElement(data, multiplyByTwoModifier, x => x.id % 2 !== 0);
    expect(result).toEqual([
      { id: 1, value: 10 },
      { id: 1, value: 20 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
      { id: 3, value: 60 }
    ]);
  });

  it('should handle empty arrays', () => {
    const data: TestItem[] = [];
    const result = dublicateArrayElement(data, multiplyByTwoModifier, x => x.id === 1);
    expect(result).toEqual([]);
  });
});
