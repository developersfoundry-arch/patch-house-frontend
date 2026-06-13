const AUTH_KEY = "sah-auth";

export const DEMO_PHONE = "9876543210";
export const DEMO_OTP = "111111";

export interface AuthUser {
  phone: string;
  name: string;
}

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setAuthUser(user: AuthUser): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearAuthUser(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return getAuthUser() !== null;
}
