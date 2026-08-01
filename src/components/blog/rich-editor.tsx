"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Maximize2,
  Minimize2,
  Undo2,
  Redo2,
  AlignLeft,
  AlertCircle,
  Terminal,
  CheckSquare,
  Table2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadBlogImage } from "@/lib/blog-images";

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

type CalloutType = "info" | "warning" | "danger";

// ── Callout node (div.callout.callout-{type}) ────────────────────────────────
const Callout = Node.create<{ HTMLAttributes: Record<string, unknown> }>({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      type: {
        default: "info",
        parseHTML: (element) =>
          element.className.match(/callout-(info|warning|danger)/)?.[1] ?? "info",
        // The type is carried by the callout-{type} class; don't emit a raw attr
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div",
        getAttrs: (element) =>
          (element as HTMLElement).classList.contains("callout") ? {} : false,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: `callout callout-${node.attrs.type}` }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleCallout:
        (type: CalloutType) =>
        ({ commands }: { commands: { toggleWrap: (name: string, attrs: object) => boolean } }) =>
          commands.toggleWrap(this.name, { type }),
    };
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      toggleCallout: (type: CalloutType) => ReturnType;
    };
  }
}

interface ToolbarButton {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  active?: boolean;
}

export function RichEditor({ value, onChange, placeholder = "Start writing…" }: RichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [linkDialog, setLinkDialog] = useState<{ open: boolean; url: string }>({
    open: false,
    url: "",
  });
  const lastEmitted = useRef(value);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
      TableKit.configure({ table: { resizable: false } }),
      TaskList,
      TaskItem.configure({ nested: true }),
      CharacterCount,
      Placeholder.configure({ placeholder }),
      Callout,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "editor-content min-h-[420px] flex-1 overflow-y-auto px-6 py-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastEmitted.current = html;
      onChange(html);
    },
  });

  // Sync external value changes (e.g. autosave restore) without clobbering typing
  useEffect(() => {
    if (editor && value !== lastEmitted.current) {
      lastEmitted.current = value;
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  // Re-render on every transaction/selection change so toolbar active states
  // and word counts stay current. (useEditorState misses the null→editor
  // transition when immediatelyRender is false, so subscribe manually.)
  const [, forceRender] = useReducer((x: number) => x + 1, 0);
  useEffect(() => {
    if (!editor) return;
    const update = () => forceRender();
    editor.on("transaction", update);
    editor.on("selectionUpdate", update);
    return () => {
      editor.off("transaction", update);
      editor.off("selectionUpdate", update);
    };
  }, [editor]);

  const editorState = editor
    ? {
        words: editor.storage.characterCount.words() as number,
        characters: editor.storage.characterCount.characters() as number,
        h1: editor.isActive("heading", { level: 1 }),
        h2: editor.isActive("heading", { level: 2 }),
        h3: editor.isActive("heading", { level: 3 }),
        h4: editor.isActive("heading", { level: 4 }),
        paragraph: editor.isActive("paragraph"),
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        strike: editor.isActive("strike"),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        taskList: editor.isActive("taskList"),
        blockquote: editor.isActive("blockquote"),
        code: editor.isActive("code"),
        codeBlock: editor.isActive("codeBlock"),
        link: editor.isActive("link"),
      }
    : null;

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!editor) return;
      const url = await uploadBlogImage(file);
      editor.chain().focus().setImage({ src: url }).run();
    },
    [editor],
  );

  const openLinkDialog = useCallback(() => {
    if (!editor) return;
    setLinkDialog({ open: true, url: editor.getAttributes("link").href ?? "" });
  }, [editor]);

  const applyLink = useCallback(() => {
    if (!editor) return;
    const url = linkDialog.url.trim();
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setLinkDialog({ open: false, url: "" });
  }, [editor, linkDialog.url]);

  if (!editor || !editorState) {
    return (
      <div className="flex min-h-120 items-center justify-center rounded-xl border border-ink/10 bg-surface shadow-soft">
        <div className="size-6 animate-spin rounded-full border-2 border-cobalt border-t-transparent" />
      </div>
    );
  }

  const readTime = `${Math.max(1, Math.ceil(editorState.words / 200))} min`;

  const toolbarButtons: (ToolbarButton | "divider")[] = [
    {
      icon: <Undo2 className="size-4" />,
      label: "Undo (Ctrl+Z)",
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo2 className="size-4" />,
      label: "Redo (Ctrl+Shift+Z)",
      action: () => editor.chain().focus().redo().run(),
    },
    "divider",
    {
      icon: <Heading1 className="size-4" />,
      label: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editorState.h1,
    },
    {
      icon: <Heading2 className="size-4" />,
      label: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editorState.h2,
    },
    {
      icon: <Heading3 className="size-4" />,
      label: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editorState.h3,
    },
    {
      icon: <Heading4 className="size-4" />,
      label: "Heading 4",
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      active: editorState.h4,
    },
    {
      icon: <AlignLeft className="size-4" />,
      label: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      active: editorState.paragraph,
    },
    "divider",
    {
      icon: <Bold className="size-4" />,
      label: "Bold (Ctrl+B)",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editorState.bold,
    },
    {
      icon: <Italic className="size-4" />,
      label: "Italic (Ctrl+I)",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editorState.italic,
    },
    {
      icon: <Underline className="size-4" />,
      label: "Underline (Ctrl+U)",
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editorState.underline,
    },
    {
      icon: <Strikethrough className="size-4" />,
      label: "Strikethrough",
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editorState.strike,
    },
    "divider",
    {
      icon: <List className="size-4" />,
      label: "Bullet list",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editorState.bulletList,
    },
    {
      icon: <ListOrdered className="size-4" />,
      label: "Numbered list",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editorState.orderedList,
    },
    {
      icon: <CheckSquare className="size-4" />,
      label: "Checklist",
      action: () => editor.chain().focus().toggleTaskList().run(),
      active: editorState.taskList,
    },
    "divider",
    {
      icon: <Quote className="size-4" />,
      label: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editorState.blockquote,
    },
    {
      icon: <Code className="size-4" />,
      label: "Inline code (Ctrl+E)",
      action: () => editor.chain().focus().toggleCode().run(),
      active: editorState.code,
    },
    {
      icon: <Terminal className="size-4" />,
      label: "Code block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editorState.codeBlock,
    },
    "divider",
    {
      icon: <LinkIcon className="size-4" />,
      label: "Insert link",
      action: openLinkDialog,
      active: editorState.link,
    },
    {
      icon: <ImageIcon className="size-4" />,
      label: "Insert image",
      action: () => fileInputRef.current?.click(),
    },
    {
      icon: <Minus className="size-4" />,
      label: "Divider",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: <Table2 className="size-4" />,
      label: "Insert table",
      action: () =>
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    "divider",
    {
      icon: <AlertCircle className="size-4 text-cobalt" />,
      label: "Info callout",
      action: () => editor.chain().focus().toggleCallout("info").run(),
    },
    {
      icon: <AlertCircle className="size-4 text-amber" />,
      label: "Warning callout",
      action: () => editor.chain().focus().toggleCallout("warning").run(),
    },
    {
      icon: <AlertCircle className="size-4 text-coral" />,
      label: "Danger callout",
      action: () => editor.chain().focus().toggleCallout("danger").run(),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-ink/10 bg-surface shadow-soft",
        isFullscreen && "fixed inset-0 z-50 rounded-none border-0",
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-ink/8 px-3 py-2">
        {toolbarButtons.map((btn, i) =>
          btn === "divider" ? (
            <div key={`div-${i}`} className="mx-1 h-5 w-px bg-ink/10" />
          ) : (
            <button
              key={btn.label}
              type="button"
              title={btn.label}
              aria-label={btn.label}
              onMouseDown={(e) => {
                e.preventDefault();
                btn.action();
              }}
              className={cn(
                "grid size-8 place-items-center rounded-lg text-ink/60 transition hover:bg-ink/5 hover:text-ink",
                btn.active && "bg-cobalt/8 text-cobalt",
              )}
            >
              {btn.icon}
            </button>
          ),
        )}

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden font-mono text-[0.65rem] text-ink/36 sm:block">
            {editorState.words}w · {editorState.characters}c · {readTime} read
          </span>
          <button
            type="button"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            onClick={() => setIsFullscreen((v) => !v)}
            className="grid size-8 place-items-center rounded-lg text-ink/50 transition hover:bg-ink/5 hover:text-ink"
          >
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile word count */}
      <div className="flex items-center gap-3 border-b border-ink/6 px-4 py-1.5 sm:hidden">
        <span className="font-mono text-[0.65rem] text-ink/36">
          {editorState.words}w · {readTime} read
        </span>
      </div>

      {/* Editor area */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ maxHeight: isFullscreen ? "calc(100vh - 120px)" : "600px" }}
        onDrop={(e) => {
          const file = e.dataTransfer.files[0];
          if (file?.type.startsWith("image/")) {
            e.preventDefault();
            handleImageUpload(file);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <EditorContent editor={editor} className="h-full [&>div]:h-full" />
      </div>

      {/* Link dialog */}
      {linkDialog.open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-ink/10 bg-surface p-6 shadow-float">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ink">Insert link</h3>
              <button
                onClick={() => setLinkDialog({ open: false, url: "" })}
                className="grid size-7 place-items-center rounded-lg text-ink/40 hover:bg-ink/5"
              >
                <X className="size-4" />
              </button>
            </div>
            <input
              type="url"
              placeholder="https://example.com"
              value={linkDialog.url}
              onChange={(e) => setLinkDialog((d) => ({ ...d, url: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && applyLink()}
              autoFocus
              className="mt-4 h-10 w-full rounded-lg border border-ink/10 px-3 text-sm text-ink placeholder:text-ink/36 focus:border-cobalt/40 focus:outline-none"
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={applyLink}
                className="flex-1 rounded-lg bg-cobalt py-2 text-sm font-semibold text-page hover:bg-cobalt/90"
              >
                Apply
              </button>
              <button
                onClick={() => setLinkDialog({ open: false, url: "" })}
                className="flex-1 rounded-lg border border-ink/10 py-2 text-sm font-semibold text-ink/60 hover:bg-ink/3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
          e.target.value = "";
        }}
      />

      <style>{`
        .editor-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: var(--ink-soft, rgba(230,237,247,0.35));
          float: left;
          height: 0;
          pointer-events: none;
        }
        .editor-content { font-size: 1rem; line-height: 1.8; color: var(--ink); }
        .editor-content * { color: inherit; }
        .editor-content h1,.editor-content h2,.editor-content h3,.editor-content h4 { font-weight:700; line-height:1.2; margin-top:1.75rem; margin-bottom:0.75rem; color:var(--ink); letter-spacing:-0.01em; }
        .editor-content h1{font-size:1.875rem;} .editor-content h2{font-size:1.5rem;} .editor-content h3{font-size:1.25rem;} .editor-content h4{font-size:1.125rem;}
        .editor-content p { margin-bottom:1rem; }
        .editor-content a { color:var(--cobalt); text-decoration:underline; text-underline-offset:3px; }
        .editor-content blockquote { border-left:3px solid var(--cobalt); padding-left:1rem; margin:1.5rem 0; color:var(--ink-soft); font-style:italic; }
        .editor-content code { font-family:'IBM Plex Mono',monospace; font-size:0.875em; background:var(--cobalt-light); border:1px solid var(--border); border-radius:4px; padding:0.1em 0.35em; color:var(--cobalt); }
        .editor-content pre { background:#080d17; border-radius:10px; padding:1rem 1.25rem; overflow-x:auto; margin:1.5rem 0; }
        .editor-content pre code { background:none; border:none; padding:0; color:#e2e8ef; font-size:0.875rem; line-height:1.7; }
        .editor-content ul:not([data-type="taskList"]) { list-style:disc; padding-left:1.5rem; margin-bottom:1rem; }
        .editor-content ol { list-style:decimal; padding-left:1.5rem; margin-bottom:1rem; }
        .editor-content li { margin-bottom:0.35rem; }
        .editor-content hr { border:none; border-top:1px solid var(--border); margin:2rem 0; }
        .editor-content img { border-radius:8px; max-width:100%; height:auto; margin:1.5rem 0; display:block; }
        .editor-content img.ProseMirror-selectednode { outline:2px solid var(--cobalt); }
        .editor-content table { width:100%; border-collapse:collapse; margin:1.5rem 0; }
        .editor-content th { background:var(--muted); font-weight:700; text-align:left; padding:0.6rem 0.875rem; border:1px solid var(--border); color:var(--ink); }
        .editor-content td { padding:0.6rem 0.875rem; border:1px solid var(--border); color:var(--ink); }
        .editor-content .callout { border-radius:10px; padding:1rem 1.25rem; margin:1.5rem 0; border:1px solid; }
        .editor-content .callout p:last-child { margin-bottom:0; }
        .editor-content .callout-info { background:var(--cobalt-light); border-color:var(--cobalt); }
        .editor-content .callout-warning { background:rgba(251,191,36,0.08); border-color:rgba(251,191,36,0.35); }
        .editor-content .callout-danger { background:var(--coral-light); border-color:var(--coral); }
        .editor-content ul[data-type="taskList"] { list-style:none; padding-left:0; }
        .editor-content ul[data-type="taskList"] li { display:flex; align-items:flex-start; gap:0.5rem; }
        .editor-content ul[data-type="taskList"] input[type="checkbox"] { margin-top:0.35rem; accent-color:var(--cobalt); }
        .editor-content ul[data-type="taskList"] li > div { flex:1; }
        .editor-content .ProseMirror-gapcursor:after { border-top:1px solid var(--ink); }
      `}</style>
    </div>
  );
}
