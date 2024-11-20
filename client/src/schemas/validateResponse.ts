import { z } from "zod";

export function validateResponse<T>(response: object, schema: z.ZodSchema<T>) {
  const { success, data, error } = schema.safeParse(response);

  if (!success) {
    const flattenedError = error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    console.log(flattenedError);

    return { success, error, data: null };
  }

  return { success, error: null, data };
}
