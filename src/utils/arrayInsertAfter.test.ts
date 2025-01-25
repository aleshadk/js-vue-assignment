import { arrayInsertAfter } from './arrayInsertAfter';
import { describe, it, expect } from 'vitest';

interface TestItem {
  id: number;
  value: string;
}

function createTestData(): TestItem[] {
  return [
    { id: 1, value: 'one' },
    { id: 2, value: 'two' },
    { id: 3, value: 'three' }
  ];
}

describe('arrayInsertAfter', () => {
  it('should append item at the end when no predicate is provided', () => {
    const data = createTestData();
    const newItem = { id: 4, value: 'four' };
    const result = arrayInsertAfter(data, newItem);
    expect(result).toEqual([
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 3, value: 'three' },
      { id: 4, value: 'four' }
    ]);
  });

  it('should insert item after the matching element', () => {
    const data = createTestData();
    const newItem = { id: 4, value: 'four' };
    const result = arrayInsertAfter(data, newItem, x => x.id === 2);
    expect(result).toEqual([
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 4, value: 'four' },
      { id: 3, value: 'three' }
    ]);
  });

  it('should append item at the end when no elements match the predicate', () => {
    const data = createTestData();
    const newItem = { id: 4, value: 'four' };
    const result = arrayInsertAfter(data, newItem, x => x.id === 5);
    expect(result).toEqual([
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 3, value: 'three' },
      { id: 4, value: 'four' }
    ]);
  });

  it('should handle empty arrays', () => {
    const data: TestItem[] = [];
    const newItem = { id: 1, value: 'one' };
    const result = arrayInsertAfter(data, newItem, x => x.id === 1);
    expect(result).toEqual([{ id: 1, value: 'one' }]);
  });

  it('should insert after the first matching element when multiple elements match', () => {
    const data = [
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 2, value: 'another two' },
      { id: 3, value: 'three' }
    ];
    const newItem = { id: 4, value: 'four' };
    const result = arrayInsertAfter(data, newItem, x => x.id === 2);
    expect(result).toEqual([
      { id: 1, value: 'one' },
      { id: 2, value: 'two' },
      { id: 4, value: 'four' },
      { id: 2, value: 'another two' },
      { id: 3, value: 'three' }
    ]);
  });
});
