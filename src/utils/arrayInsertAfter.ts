// TODO: add testsadd tests
export function arrayInsertAfter<TData>(data: TData[], newItem: TData, afterPredicate?: (item: TData) => boolean): TData[] {
  if (!afterPredicate) {
    return [...data, newItem];
  }

  const result = data.reduce((res, block) => {
    res.push(block);
    if (afterPredicate(block)) {
      res.push(newItem);
    }
    return res
  }, [] as TData[]);

  if (result.length === data.length) {
    return [...data, newItem];
  }

  return result;
}