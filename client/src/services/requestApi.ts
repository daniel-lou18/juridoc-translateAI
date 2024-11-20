export async function requestApi<T>(
  url: string,
  options: RequestInit = { method: "GET" }
): Promise<T> {
  try {
    const result = await fetch(url, options);

    if (!result.ok) {
      throw new Error(`HTTP Error: ${result.status} - ${result.statusText}`);
    }

    const data = await result.json();
    return data as T;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(message);
    throw new Error(message);
  }
}
