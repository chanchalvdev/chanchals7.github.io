import { supabase } from "./supabase";

export async function adminLogin(email: string, password: string): Promise<boolean> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return !error;
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

export async function adminLogout(): Promise<void> {
  await supabase.auth.signOut();
}
