interface MappedObject<S> {
  [key: string]: S,
}

export default function objectMapValues<S = any, D = any>(
  obj: MappedObject<S>,
  fn: (value: S, key?: string) => D,
) {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key] = fn(obj[key], key);
      return acc;
    },
    {}
  );
}
