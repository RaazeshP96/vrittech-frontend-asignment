import { BASE_URL } from "../constant";
import { ApiError } from "./errors";

export const apiFetch = async <T>(
  path: string,
  init?: RequestInit,
): Promise<T> => {
  if (!BASE_URL) {
    throw new ApiError("API_BASE_URL is not set", "config");
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, init);
  } catch {
    throw new ApiError("Could not reach the server", "network");
  }

  if (!res.ok) {
    console.error(
      "API error",
      res.status,
      res.headers.get("cf-mitigated"),
      (await res.clone().text()).slice(0, 300),
    );
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
};
