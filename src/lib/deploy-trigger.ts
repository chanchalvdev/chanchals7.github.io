import { supabase } from "./supabase";

/**
 * Asks the trigger-deploy Edge Function to dispatch the GitHub Pages
 * workflow so a freshly published post gets its static page + sitemap
 * entry. Fire-and-forget: publishing must never block on this — until
 * the deploy lands, the 404 fallback keeps the post readable.
 */
export async function triggerSiteDeploy(): Promise<boolean> {
  try {
    const { error } = await supabase.functions.invoke("trigger-deploy");
    if (error) {
      console.warn("Deploy trigger failed (deploy manually or push to master):", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Deploy trigger unavailable:", err);
    return false;
  }
}
