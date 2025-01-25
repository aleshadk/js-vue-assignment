export function arrayInsertAfter<TData>(data: TData[], newItem: TData, afterPredicate?: (item: TData) => boolean): TData[] {
  if (!afterPredicate) {
    return [...data, newItem];
  }

  let inserted = false;

  const result = data.reduce((res, element) => {
    res.push(element);
    if (afterPredicate(element) && !inserted) {
      res.push(newItem);
      inserted = true;
    }
    return res
  }, [] as TData[]);

  if (result.length === data.length) {
    return [...data, newItem];
  }

  return result;
}