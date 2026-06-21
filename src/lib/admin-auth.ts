const AUTH_KEY = "portfolio_admin_v1";
const ADMIN_EMAIL = "admin@portfolio.com";
const ADMIN_PASSWORD = "admin123";

export interface AdminSession {
  email: string;
  loggedIn: boolean;
  createdAt: number;
}

export function adminLogin(email: string, password: string): boolean {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const session: AdminSession = { email, loggedIn: true, createdAt: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    return (JSON.parse(raw) as AdminSession).loggedIn === true;
  } catch {
    return false;
  }
}

export function adminLogout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
}
