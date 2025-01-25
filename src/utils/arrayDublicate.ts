// TODO: add testsadd tests
export function dublicateArrayElement<TData>(data: TData[], modifier: (item: TData) => TData, dublicatePredicate: (item: TData) => boolean): TData[] {
  const result = data.reduce((res, element) => {
    res.push(element);
    if (dublicatePredicate(element)) {
      res.push(modifier(element));
    }
    return res
  }, [] as TData[]);

  return result;
}