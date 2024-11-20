export function cleanValue(value: string | null) {
  if (!value) return "";

  return value.trim().replace(/\n|\t/g, " ").replace(/\s+/g, " ");
}

export function cleanKey(key: string | null) {
  if (!key) return "";

  return key
    .trim()
    .replace(/:[^:]*$/, "")
    .replace(/\n|\t/g, " ")
    .replace(/\s+/g, " ");
}
