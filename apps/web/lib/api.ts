/**
 * Auth-aware fetch wrapper for dashboard API calls.
 * Automatically redirects to /login on 401 responses.
 */
export async function apiFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(path, init);

  if (res.status === 401 && typeof window !== "undefined") {
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  return res;
}
