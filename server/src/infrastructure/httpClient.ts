type IHttpRequest = <T>(url: string, options?: RequestInit) => Promise<T>;

export interface IHttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, options: RequestInit): Promise<T>;
}

class HttpClient implements IHttpClient {
  constructor(private httpRequest: IHttpRequest) {}

  async get<T>(url: string): Promise<T> {
    return await this.httpRequest(url);
  }

  async post<T>(url: string, options: RequestInit): Promise<T> {
    return await this.httpRequest(url, { method: "POST", ...options });
  }
}

export async function httpRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const mergedOptions: RequestInit = {
      headers: { "Content-Type": "application/json" },
      ...options,
    };

    const result = await fetch(url, mergedOptions);

    if (!result.ok) {
      throw new Error(`Http error ${result.status}: ${result.statusText}`);
    }

    const data: T = await result.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Request to ${url} failed: ${error.message}`
        : `Request to ${url} failed: unknown error`
    );
  }
}

export default new HttpClient(httpRequest);
