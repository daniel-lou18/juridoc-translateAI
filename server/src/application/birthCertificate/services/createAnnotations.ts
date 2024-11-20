export function createAnnotations(annotations: string[], idx: number) {
  return {
    description: annotations[idx].match(
      /Averbamento\s+no\.\s*(\d+)\s*,.*?((?:\d{1,4}[-/.]\d{1,4}[-/.]\d{1,4})$)/
    ) || ["", "", ""],
    responsible: {
      person: annotations[idx + 2].match(/^(.*?),/)?.[1] || "",
      office:
        annotations[idx + 2].match(
          /(?:Civil|Predial|Comercial|de)\s+([A-ZÉÀÁÂÃÇÍa-zà-ÿ]+)$/
        )?.[1] || "",
    },
  };
}
