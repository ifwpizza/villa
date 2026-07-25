const apiFetch = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, { credentials: 'include', ...init });

export async function verifyOwnerSession(): Promise<boolean> {
  try {
    const res = await apiFetch('/api/verify');
    return res.ok;
  } catch {
    return false;
  }
}

export async function loginOwner(password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await apiFetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: (data as { error?: string }).error || 'Authentication failed' };
  }
  return { ok: true };
}

export async function logoutOwner(): Promise<void> {
  await apiFetch('/api/logout', { method: 'POST' });
}

async function getCsrfToken(): Promise<string> {
  const res = await apiFetch('/api/csrf-token');
  if (!res.ok) {
    throw new Error('Failed to obtain CSRF token');
  }
  const data = (await res.json()) as { csrfToken: string };
  return data.csrfToken;
}

export async function saveAvailability(bookedDates: string[]): Promise<Response> {
  const csrfToken = await getCsrfToken();
  return apiFetch('/api/availability', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify({ bookedDates }),
  });
}

export async function fetchAvailability(): Promise<{ bookedDates: string[] }> {
  const res = await apiFetch('/api/availability');
  if (!res.ok) {
    throw new Error('Failed to load availability');
  }
  return res.json();
}
