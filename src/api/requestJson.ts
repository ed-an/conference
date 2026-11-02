const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export async function requestJson<T extends object>(
  path: string,
  init: RequestInit,
  fallbackMessage: string,
): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${apiUrl}${path}`, init)
  } catch {
    throw new Error(fallbackMessage)
  }

  let body: T | { message?: string }
  try {
    body = await response.json() as T | { message?: string }
  } catch {
    throw new Error(fallbackMessage)
  }
  if (!response.ok) {
    throw new Error(
      !Array.isArray(body) && 'message' in body && body.message
        ? body.message
        : fallbackMessage,
    )
  }
  return body as T
}
