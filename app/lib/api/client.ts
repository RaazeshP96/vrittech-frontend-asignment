import { BASE_URL } from "../constant";
import { ApiError } from "./errors";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  if (!BASE_URL) {
    throw new ApiError("NEXT_PUBLIC_API_BASE_URL is not set", "config");
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, init);
  } catch {
    throw new ApiError("Could not reach the server", "network");
  }

  if (!res.ok) {
    throw new ApiError(
      `Request to ${path} failed (${res.status})`,
      "http",
      res.status,
    );
  }

  const text = await res.text();
  if (!text) {
    throw new ApiError(`Empty response from ${path}`, "parse", res.status);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError(`Invalid JSON from ${path}`, "parse", res.status);
  }
}
