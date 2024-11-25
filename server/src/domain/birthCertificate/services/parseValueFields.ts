type SourceNode = { sourceKey: string };
type PatternNode = { pattern: RegExp } & SourceNode;
type CleanupNode = { cleanup: string } & SourceNode;
export interface FieldMappings<M extends string> {
  [key: string]: PatternNode | CleanupNode | FieldMappings<M>;
}

// The result type has the same keys of the fieldMappings,
// except for the leave nodes which are strings
export type ResultType<T> = {
  [K in keyof T]: T[K] extends SourceNode
    ? string | null
    : T[K] extends FieldMappings<any>
    ? ResultType<T[K]>
    : never;
};

export function parseValueFields<M extends string, T extends FieldMappings<M>>(
  fields: Record<M, string>,
  fieldMappings: T,
  totalResult: Record<string, any> = {}
): ResultType<T> {
  const result: Record<string, any> = {};
  for (const key in fieldMappings) {
    const value = fieldMappings[key];

    if (
      typeof value === "string" ||
      value instanceof RegExp ||
      key in totalResult
    ) {
      continue;
    }

    if ("sourceKey" in value && "pattern" in value) {
      result[key] =
        fields[value.sourceKey as M]
          .match(value.pattern as RegExp)?.[1]
          ?.trim() ||
        fields[value.sourceKey as M]
          .match(value.pattern as RegExp)?.[0]
          ?.trim() ||
        null;
      continue;
    }

    if ("sourceKey" in value && "cleanup" in value) {
      result[key] = fields[value.sourceKey as M]
        ?.replace(value.cleanup as string, "")
        ?.trim();
      continue;
    }

    result[key] = parseValueFields(fields, value, result);
  }

  return result as ResultType<T>;
}
