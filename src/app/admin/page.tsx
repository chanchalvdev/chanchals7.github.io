"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ChangeEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Edit2,
  Eye,
  FileText,
  LogOut,
  PenLine,
  Plus,
  Save,
  Trash2,
  X,
  Image as ImageIcon,
} from "lucide-react";
import {
  type StoredBlogPost,
  getBlogs,
  getBlogById,
  saveBlog,
  deleteBlog,
  generateId,
  generateSlug,
  calculateReadTime,
  countWords,
  formatDate,
} from "@/lib/blog-storage";
import { isAdminLoggedIn, adminLogout } from "@/lib/admin-auth";
import { uploadBlogImage } from "@/lib/blog-images";
import { triggerSiteDeploy } from "@/lib/deploy-trigger";
import { RichEditor } from "@/components/blog/rich-editor";
import { cn } from "@/lib/utils";

type View = "list" | "new" | "edit";

const AUTOSAVE_KEY = "portfolio_admin_autosave";

type PostDraft = Omit<StoredBlogPost, "id" | "createdAt" | "updatedAt" | "readTime" | "wordCount">;

// ── Metadata panel ──────────────────────────────────────────────────────────
function MetaPanel({
  data,
  onChange,
}: {
  data: PostDraft & Partial<Pick<StoredBlogPost, "id" | "createdAt" | "updatedAt" | "readTime" | "wordCount">>;
  onChange: (patch: Partial<StoredBlogPost>) => void;
}) {
  const coverRef = useRef<HTMLInputElement>(null);

  async function handleCoverUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const url = await uploadBlogImage(file);
    onChange({ coverImage: url });
  }

  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink/60">Title *</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => {
            const title = e.target.value;
            onChange({ title, slug: data.slug || generateSlug(title) });
          }}
          placeholder="Post title"
          className="h-10 w-full rounded-xl border border-ink/10 bg-page px-3 text-sm text-ink placeholder:text-ink/30 focus:border-cobalt/40 focus:bg-surface focus:outline-none"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink/60">Slug</label>
        <input
          type="text"
          value={data.slug}
          onChange={(e) => onChange({ slug: e.target.value })}
          placeholder="url-friendly-slug"
          className="h-10 w-full rounded-xl border border-ink/10 bg-page px-3 font-mono text-xs text-ink placeholder:text-ink/30 focus:border-cobalt/40 focus:bg-surface focus:outline-none"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink/60">Excerpt *</label>
        <textarea
          value={data.excerpt}
          onChange={(e) => onChange({ excerpt: e.target.value })}
          placeholder="Brief description of the post…"
          rows={3}
          className="w-full resize-none rounded-xl border border-ink/10 bg-page p-3 text-sm text-ink placeholder:text-ink/30 focus:border-cobalt/40 focus:bg-surface focus:outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink/60">Category</label>
        <input
          type="text"
          value={data.category}
          onChange={(e) => onChange({ category: e.target.value })}
          placeholder="Engineering, Product, Security…"
          className="h-10 w-full rounded-xl border border-ink/10 bg-page px-3 text-sm text-ink placeholder:text-ink/30 focus:border-cobalt/40 focus:bg-surface focus:outline-none"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink/60">Tags (comma-separated)</label>
        <input
          type="text"
          value={data.tags.join(", ")}
          onChange={(e) =>
            onChange({
              tags: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            })
          }
          placeholder="React, TypeScript, Go"
          className="h-10 w-full rounded-xl border border-ink/10 bg-page px-3 text-sm text-ink placeholder:text-ink/30 focus:border-cobalt/40 focus:bg-surface focus:outline-none"
        />
      </div>

      {/* Cover image */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink/60">Cover image</label>
        {data.coverImage ? (
          <div className="relative overflow-hidden rounded-xl border border-ink/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.coverImage} alt="Cover" className="h-32 w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange({ coverImage: undefined })}
              className="absolute right-2 top-2 grid size-7 place-items-center rounded-lg bg-black/50 text-white hover:bg-black/70"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => coverRef.current?.click()}
            className="flex h-20 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink/10 text-sm font-semibold text-ink/36 transition hover:border-cobalt/25 hover:text-cobalt"
          >
            <ImageIcon className="size-4" />
            Upload cover
          </button>
        )}
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleCoverUpload}
        />
      </div>

      {/* SEO */}
      <details className="rounded-xl border border-ink/8 bg-page">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-ink/60">
          SEO settings
        </summary>
        <div className="space-y-4 px-4 pb-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink/50">SEO title</label>
            <input
              type="text"
              value={data.seoTitle ?? ""}
              onChange={(e) => onChange({ seoTitle: e.target.value })}
              placeholder="Custom page title for search engines"
              className="h-9 w-full rounded-lg border border-ink/10 bg-surface px-3 text-sm text-ink placeholder:text-ink/30 focus:border-cobalt/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-ink/50">SEO description</label>
            <textarea
              value={data.seoDescription ?? ""}
              onChange={(e) => onChange({ seoDescription: e.target.value })}
              placeholder="Meta description for search engines"
              rows={2}
              className="w-full resize-none rounded-lg border border-ink/10 bg-surface p-3 text-sm text-ink placeholder:text-ink/30 focus:border-cobalt/30 focus:outline-none"
            />
          </div>
        </div>
      </details>
    </div>
  );
}

// ── Blog table ───────────────────────────────────────────────────────────────
function BlogTable({
  blogs,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  blogs: StoredBlogPost[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-surface py-20 text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-cobalt/6">
          <PenLine className="size-6 text-cobalt/60" aria-hidden="true" />
        </div>
        <div>
          <p className="text-lg font-semibold text-ink">No posts yet</p>
          <p className="mt-1 text-sm text-ink/50">Create your first blog post to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-ink/8 bg-page">
              <th className="px-5 py-3.5 text-left font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/36">
                Title
              </th>
              <th className="px-4 py-3.5 text-left font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/36">
                Status
              </th>
              <th className="hidden px-4 py-3.5 text-left font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/36 sm:table-cell">
                Created
              </th>
              <th className="hidden px-4 py-3.5 text-left font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/36 lg:table-cell">
                Updated
              </th>
              <th className="px-4 py-3.5 text-right font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/36">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/6">
            {blogs.map((blog) => (
              <tr key={blog.id} className="group transition hover:bg-cobalt/2">
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-ink line-clamp-1">{blog.title || "(Untitled)"}</p>
                    <p className="mt-0.5 font-mono text-[0.65rem] text-ink/36">/{blog.slug}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => onToggleStatus(blog.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] transition hover:opacity-80",
                      blog.status === "published"
                        ? "border-signal/25 bg-signal/8 text-signal"
                        : "border-ink/15 bg-ink/5 text-ink/44",
                    )}
                    title={`Click to ${blog.status === "published" ? "unpublish" : "publish"}`}
                  >
                    {blog.status === "published" ? (
                      <>
                        <Check className="size-2.5" /> Published
                      </>
                    ) : (
                      "Draft"
                    )}
                  </button>
                </td>
                <td className="hidden px-4 py-4 text-ink/44 sm:table-cell">
                  {formatDate(blog.createdAt)}
                </td>
                <td className="hidden px-4 py-4 text-ink/44 lg:table-cell">
                  {formatDate(blog.updatedAt)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1.5">
                    {blog.status === "published" && (
                      <Link
                        href={`/blog/post/?id=${blog.slug}`}
                        target="_blank"
                        title="View post"
                        className="grid size-8 place-items-center rounded-lg border border-ink/10 text-ink/44 transition hover:border-cobalt/25 hover:text-cobalt"
                      >
                        <Eye className="size-3.5" />
                      </Link>
                    )}
                    <button
                      onClick={() => onEdit(blog.id)}
                      title="Edit post"
                      className="grid size-8 place-items-center rounded-lg border border-ink/10 text-ink/44 transition hover:border-cobalt/25 hover:text-cobalt"
                    >
                      <Edit2 className="size-3.5" />
                    </button>

                    {confirmDelete === blog.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            onDelete(blog.id);
                            setConfirmDelete(null);
                          }}
                          className="grid size-8 place-items-center rounded-lg bg-coral text-page transition hover:bg-coral/90"
                          title="Confirm delete"
                        >
                          <Check className="size-3.5" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="grid size-8 place-items-center rounded-lg border border-ink/10 text-ink/44 hover:text-ink"
                          title="Cancel"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(blog.id)}
                        title="Delete post"
                        className="grid size-8 place-items-center rounded-lg border border-ink/10 text-ink/44 transition hover:border-coral/25 hover:text-coral"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Editor view ──────────────────────────────────────────────────────────────
function EditorView({
  initialPost,
  onSave,
  onBack,
}: {
  initialPost: StoredBlogPost | null;
  onSave: (post: StoredBlogPost) => void;
  onBack: () => void;
}) {
  const [post, setPost] = useState<StoredBlogPost>(() => {
    if (initialPost) return { ...initialPost };

    // Check for autosaved draft
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as StoredBlogPost;
        if (!parsed.id) return createNewPost();
        return createNewPost(); // Don't restore for new posts in list view
      }
    } catch {
      // noop
    }
    return createNewPost();
  });

  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNew = !initialPost;

  function createNewPost(): StoredBlogPost {
    const now = new Date().toISOString();
    return {
      id: generateId(),
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: "",
      tags: [],
      status: "draft",
      createdAt: now,
      updatedAt: now,
      readTime: "1 min read",
      wordCount: 0,
    };
  }

  const patch = useCallback((updates: Partial<StoredBlogPost>) => {
    setPost((prev) => {
      const next = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      if (updates.content !== undefined) {
        next.readTime = calculateReadTime(updates.content);
        next.wordCount = countWords(updates.content);
      }
      return next;
    });
  }, []);

  // Autosave
  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(post));
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    }, 1500);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [post]);

  async function handleSave(publish?: boolean) {
    if (!post.title.trim()) {
      alert("Please add a title before saving.");
      return;
    }
    if (!post.slug.trim()) {
      patch({ slug: generateSlug(post.title) });
    }

    const now = new Date().toISOString();
    const finalPost: StoredBlogPost = {
      ...post,
      slug: post.slug || generateSlug(post.title),
      status: publish ? "published" : post.status,
      publishedAt: publish && !post.publishedAt ? now : post.publishedAt,
      updatedAt: now,
    };

    await saveBlog(finalPost);
    localStorage.removeItem(AUTOSAVE_KEY);
    if (publish) void triggerSiteDeploy();
    onSave(finalPost);
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-ink/8 bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-bold text-ink/50 transition hover:text-ink"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <span className="text-ink/20">/</span>
            <span className="text-sm font-semibold text-ink/70 line-clamp-1">
              {post.title || (isNew ? "New post" : "Edit post")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {saveState === "saved" && (
              <span className="hidden items-center gap-1 text-xs font-semibold text-signal sm:flex">
                <Check className="size-3" /> Autosaved
              </span>
            )}

            <span
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em]",
                post.status === "published"
                  ? "border-signal/25 bg-signal/8 text-signal"
                  : "border-ink/15 bg-ink/5 text-ink/44",
              )}
            >
              {post.status}
            </span>

            <button
              onClick={() => handleSave(false)}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-ink/10 bg-surface px-4 text-sm font-semibold text-ink/70 transition hover:border-cobalt/25 hover:text-cobalt"
            >
              <Save className="size-3.5" />
              <span className="hidden sm:inline">Save draft</span>
            </button>

            <button
              onClick={() => handleSave(true)}
              className="flex h-9 items-center gap-1.5 rounded-xl bg-cobalt px-4 text-sm font-bold text-page transition hover:bg-cobalt/90"
            >
              <ArrowUpRight className="size-3.5" />
              <span>{post.status === "published" ? "Update" : "Publish"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor layout */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
        {/* Main: Title + editor */}
        <div>
          <input
            type="text"
            value={post.title}
            onChange={(e) => patch({ title: e.target.value, slug: post.slug || generateSlug(e.target.value) })}
            placeholder="Post title…"
            className="mb-6 w-full border-0 bg-transparent text-4xl font-bold text-ink placeholder:text-ink/20 focus:outline-none sm:text-5xl"
          />
          <RichEditor
            value={post.content}
            onChange={(html) => patch({ content: html })}
            placeholder="Start writing your post… (drop images, use toolbar for formatting)"
          />
        </div>

        {/* Sidebar: metadata */}
        <aside>
          <div className="lg:sticky lg:top-20">
            <div className="rounded-xl border border-ink/10 bg-surface p-5 shadow-soft">
              <p className="text-kicker mb-4 text-ink/40">Post settings</p>
              <MetaPanel data={post} onChange={patch} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ── Main admin page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("list");
  const [editingPost, setEditingPost] = useState<StoredBlogPost | null>(null);
  const [blogs, setBlogs] = useState<StoredBlogPost[]>([]);

  useEffect(() => {
    setMounted(true);
    (async () => {
      const ok = await isAdminLoggedIn();
      if (!ok) { router.replace("/admin/login"); return; }
      const data = await getBlogs();
      setBlogs(data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
    })();
  }, [router]);

  async function refreshBlogs() {
    const data = await getBlogs();
    setBlogs(data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
  }

  async function handleLogout() {
    await adminLogout();
    router.push("/admin/login");
  }

  async function handleDelete(id: string) {
    await deleteBlog(id);
    refreshBlogs();
  }

  async function handleToggleStatus(id: string) {
    // List rows omit content — fetch the full post so the upsert doesn't wipe it
    const blog = await getBlogById(id);
    if (!blog) return;
    const now = new Date().toISOString();
    const updated: StoredBlogPost = {
      ...blog,
      status: blog.status === "published" ? "draft" : "published",
      publishedAt: blog.status !== "published" ? now : blog.publishedAt,
      updatedAt: now,
    };
    await saveBlog(updated);
    if (updated.status === "published") void triggerSiteDeploy();
    refreshBlogs();
  }

  async function handleEdit(id: string) {
    const full = await getBlogById(id);
    if (!full) return;
    setEditingPost(full);
    setView("edit");
  }

  function handleSave() {
    refreshBlogs();
    setView("list");
    setEditingPost(null);
  }

  // Guard: not mounted
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <div className="grid size-8 place-items-center">
          <div className="size-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
        </div>
      </div>
    );
  }

  // Editor views
  if (view === "new") {
    return (
      <EditorView
        initialPost={null}
        onSave={handleSave}
        onBack={() => setView("list")}
      />
    );
  }

  if (view === "edit" && editingPost) {
    return (
      <EditorView
        initialPost={editingPost}
        onSave={handleSave}
        onBack={() => { setView("list"); setEditingPost(null); }}
      />
    );
  }

  // Dashboard list view
  const published = blogs.filter((b) => b.status === "published").length;
  const drafts = blogs.filter((b) => b.status === "draft").length;

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <header className="border-b border-ink/8 bg-surface">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-cobalt font-mono text-[0.8rem] font-bold text-page">
              CV
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Admin Panel</p>
              <p className="text-xs text-ink/40">Blog management</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden h-9 items-center gap-1.5 rounded-xl border border-ink/10 px-4 text-sm font-semibold text-ink/60 transition hover:border-cobalt/25 hover:text-cobalt sm:flex"
            >
              View site
              <ArrowUpRight className="size-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-ink/10 px-4 text-sm font-semibold text-ink/60 transition hover:border-coral/25 hover:text-coral"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total posts", value: blogs.length, icon: <FileText className="size-5 text-cobalt" /> },
            { label: "Published", value: published, icon: <Check className="size-5 text-signal" /> },
            { label: "Drafts", value: drafts, icon: <Edit2 className="size-5 text-amber" /> },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-ink/10 bg-surface p-5 shadow-soft">
              <div className="grid size-11 place-items-center rounded-xl bg-page">{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold text-ink">{stat.value}</p>
                <p className="text-sm text-ink/44">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">All posts</h2>
          <button
            onClick={() => setView("new")}
            className="flex h-10 items-center gap-2 rounded-xl bg-cobalt px-5 text-sm font-bold text-page transition hover:-translate-y-0.5 hover:bg-cobalt/90"
          >
            <Plus className="size-4" />
            New post
          </button>
        </div>

        <BlogTable
          blogs={blogs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </main>
    </div>
  );
}
