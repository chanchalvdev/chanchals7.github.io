import { supabase } from "./supabase";

const BUCKET = "blog-images";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function uploadToStorage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Uploads to the blog-images bucket and returns its public URL.
 * Falls back to an inline data URL if Storage is unavailable
 * (e.g. bucket not provisioned), so publishing never blocks.
 */
export async function uploadBlogImage(file: File): Promise<string> {
  try {
    return await uploadToStorage(file);
  } catch (err) {
    console.warn("Storage upload failed, embedding image inline:", err);
    return fileToDataUrl(file);
  }
}
