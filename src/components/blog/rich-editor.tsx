"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
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

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

interface ToolbarButton {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  active?: boolean;
  divider?: boolean;
}

type CalloutType = "info" | "warning" | "danger";

export function RichEditor({ value, onChange, placeholder = "Start writing…" }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readTime, setReadTime] = useState("0 min");
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [linkDialog, setLinkDialog] = useState<{ open: boolean; url: string; savedRange: Range | null }>({
    open: false,
    url: "",
    savedRange: null,
  });

  const emit = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    onChange(html);
    const text = editorRef.current.innerText || "";
    const words = text.split(/\s+/).filter((w) => w.length > 0).length;
    setWordCount(words);
    setCharCount(text.length);
    setReadTime(`${Math.max(1, Math.ceil(words / 200))} min`);
  }, [onChange]);

  // Initialize content once
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
      const text = editorRef.current.innerText || "";
      const words = text.split(/\s+/).filter((w) => w.length > 0).length;
      setWordCount(words);
      setCharCount(text.length);
      setReadTime(`${Math.max(1, Math.ceil(words / 200))} min`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateActiveFormats = useCallback(() => {
    try {
      const formats = new Set<string>();
      if (document.queryCommandState("bold")) formats.add("bold");
      if (document.queryCommandState("italic")) formats.add("italic");
      if (document.queryCommandState("underline")) formats.add("underline");
      if (document.queryCommandState("strikeThrough")) formats.add("strike");
      const block = document.queryCommandValue("formatBlock");
      if (block) formats.add(block.toLowerCase());
      setActiveFormats(formats);
    } catch {
      // execCommand may throw in some contexts
    }
  }, []);

  const exec = useCallback(
    (command: string, value?: string) => {
      editorRef.current?.focus();
      try {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        document.execCommand(command, false, value);
      } catch {
        // noop
      }
      emit();
      updateActiveFormats();
    },
    [emit, updateActiveFormats],
  );

  const insertBlock = useCallback(
    (tag: string) => {
      editorRef.current?.focus();
      try {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        document.execCommand("formatBlock", false, tag);
      } catch {
        // noop
      }
      emit();
      updateActiveFormats();
    },
    [emit, updateActiveFormats],
  );

  const insertCodeBlock = useCallback(() => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const selectedText = range.toString() || "// your code here";
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.textContent = selectedText;
      pre.appendChild(code);

      range.deleteContents();
      range.insertNode(pre);

      // Insert a paragraph after the code block to allow continued typing
      const p = document.createElement("p");
      p.innerHTML = "<br>";
      pre.after(p);

      const newRange = document.createRange();
      newRange.setStart(p, 0);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
    emit();
  }, [emit]);

  const insertHr = useCallback(() => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();

      const hr = document.createElement("hr");
      range.insertNode(hr);

      const p = document.createElement("p");
      p.innerHTML = "<br>";
      hr.after(p);

      const newRange = document.createRange();
      newRange.setStart(p, 0);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
    emit();
  }, [emit]);

  const insertCallout = useCallback(
    (type: CalloutType) => {
      editorRef.current?.focus();
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const div = document.createElement("div");
        div.className = `callout callout-${type}`;
        div.innerHTML = range.toString() || "Your callout text here";
        range.deleteContents();
        range.insertNode(div);

        const p = document.createElement("p");
        p.innerHTML = "<br>";
        div.after(p);

        const newRange = document.createRange();
        newRange.setStart(p, 0);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
      emit();
    },
    [emit],
  );

  const insertChecklist = useCallback(() => {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const ul = document.createElement("ul");
      ul.setAttribute("data-type", "taskList");
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.type = "checkbox";
      const span = document.createElement("span");
      span.textContent = "Task item";
      li.appendChild(input);
      li.appendChild(span);
      ul.appendChild(li);
      range.deleteContents();
      range.insertNode(ul);

      const p = document.createElement("p");
      p.innerHTML = "<br>";
      ul.after(p);

      const newRange = document.createRange();
      newRange.setStart(span, 0);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
    emit();
  }, [emit]);

  const insertTable = useCallback(() => {
    editorRef.current?.focus();
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    ["Header 1", "Header 2", "Header 3"].forEach((h) => {
      const th = document.createElement("th");
      th.textContent = h;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);

    const tbody = document.createElement("tbody");
    for (let i = 0; i < 2; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 3; j++) {
        const td = document.createElement("td");
        td.textContent = "Cell";
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(thead);
    table.appendChild(tbody);

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(table);

      const p = document.createElement("p");
      p.innerHTML = "<br>";
      table.after(p);
    }
    emit();
  }, [emit]);

  const insertLink = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      setLinkDialog({ open: true, url: "", savedRange: range.cloneRange() });
    }
  }, []);

  const applyLink = useCallback(() => {
    if (!linkDialog.savedRange) return;
    const url = linkDialog.url.trim();
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(linkDialog.savedRange);
      if (url) {
        exec("createLink", url);
      } else {
        exec("unlink");
      }
    }
    setLinkDialog({ open: false, url: "", savedRange: null });
  }, [linkDialog, exec]);

  const handleImageUpload = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        editorRef.current?.focus();
        const img = document.createElement("img");
        img.src = src;
        img.alt = file.name;
        img.style.maxWidth = "100%";
        img.style.height = "auto";

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          range.insertNode(img);
          const p = document.createElement("p");
          p.innerHTML = "<br>";
          img.after(p);
          const newRange = document.createRange();
          newRange.setStart(p, 0);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
        }
        emit();
      };
      reader.readAsDataURL(file);
    },
    [emit],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const isMac = navigator.platform.includes("Mac");
      const ctrl = isMac ? e.metaKey : e.ctrlKey;

      if (ctrl) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            exec("bold");
            break;
          case "i":
            e.preventDefault();
            exec("italic");
            break;
          case "u":
            e.preventDefault();
            exec("underline");
            break;
          case "z":
            if (e.shiftKey) {
              e.preventDefault();
              exec("redo");
            }
            break;
          case "`":
            e.preventDefault();
            exec("insertHTML", "<code>​</code>");
            break;
        }
      }
    },
    [exec],
  );

  const toolbarButtons: (ToolbarButton | "divider")[] = [
    {
      icon: <Undo2 className="size-4" />,
      label: "Undo (Ctrl+Z)",
      action: () => exec("undo"),
    },
    {
      icon: <Redo2 className="size-4" />,
      label: "Redo (Ctrl+Shift+Z)",
      action: () => exec("redo"),
    },
    "divider",
    {
      icon: <Heading1 className="size-4" />,
      label: "Heading 1",
      action: () => insertBlock("h1"),
      active: activeFormats.has("h1"),
    },
    {
      icon: <Heading2 className="size-4" />,
      label: "Heading 2",
      action: () => insertBlock("h2"),
      active: activeFormats.has("h2"),
    },
    {
      icon: <Heading3 className="size-4" />,
      label: "Heading 3",
      action: () => insertBlock("h3"),
      active: activeFormats.has("h3"),
    },
    {
      icon: <Heading4 className="size-4" />,
      label: "Heading 4",
      action: () => insertBlock("h4"),
      active: activeFormats.has("h4"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      label: "Paragraph",
      action: () => insertBlock("p"),
      active: activeFormats.has("p"),
    },
    "divider",
    {
      icon: <Bold className="size-4" />,
      label: "Bold (Ctrl+B)",
      action: () => exec("bold"),
      active: activeFormats.has("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      label: "Italic (Ctrl+I)",
      action: () => exec("italic"),
      active: activeFormats.has("italic"),
    },
    {
      icon: <Underline className="size-4" />,
      label: "Underline (Ctrl+U)",
      action: () => exec("underline"),
      active: activeFormats.has("underline"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      label: "Strikethrough",
      action: () => exec("strikeThrough"),
      active: activeFormats.has("strike"),
    },
    "divider",
    {
      icon: <List className="size-4" />,
      label: "Bullet list",
      action: () => exec("insertUnorderedList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      label: "Numbered list",
      action: () => exec("insertOrderedList"),
    },
    {
      icon: <CheckSquare className="size-4" />,
      label: "Checklist",
      action: insertChecklist,
    },
    "divider",
    {
      icon: <Quote className="size-4" />,
      label: "Blockquote",
      action: () => insertBlock("blockquote"),
    },
    {
      icon: <Code className="size-4" />,
      label: "Inline code (Ctrl+`)",
      action: () => exec("insertHTML", "<code>​</code>"),
    },
    {
      icon: <Terminal className="size-4" />,
      label: "Code block",
      action: insertCodeBlock,
    },
    "divider",
    {
      icon: <LinkIcon className="size-4" />,
      label: "Insert link",
      action: insertLink,
    },
    {
      icon: <ImageIcon className="size-4" />,
      label: "Insert image",
      action: () => fileInputRef.current?.click(),
    },
    {
      icon: <Minus className="size-4" />,
      label: "Divider",
      action: insertHr,
    },
    {
      icon: <Table2 className="size-4" />,
      label: "Insert table",
      action: insertTable,
    },
    "divider",
    {
      icon: <AlertCircle className="size-4 text-cobalt" />,
      label: "Info callout",
      action: () => insertCallout("info"),
    },
    {
      icon: <AlertCircle className="size-4 text-amber" />,
      label: "Warning callout",
      action: () => insertCallout("warning"),
    },
    {
      icon: <AlertCircle className="size-4 text-coral" />,
      label: "Danger callout",
      action: () => insertCallout("danger"),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-ink/10 bg-white shadow-soft",
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
            {wordCount}w · {charCount}c · {readTime} read
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
          {wordCount}w · {readTime} read
        </span>
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onKeyDown={handleKeyDown}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        className={cn(
          "editor-content min-h-[420px] flex-1 overflow-y-auto px-6 py-5 focus:outline-none",
          isFullscreen && "min-h-0",
        )}
        style={{ maxHeight: isFullscreen ? "calc(100vh - 120px)" : "600px" }}
        data-placeholder={placeholder}
        onDrop={(e) => {
          const file = e.dataTransfer.files[0];
          if (file?.type.startsWith("image/")) {
            e.preventDefault();
            handleImageUpload(file);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      />

      {/* Link dialog */}
      {linkDialog.open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-ink/10 bg-white p-6 shadow-float">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ink">Insert link</h3>
              <button
                onClick={() => setLinkDialog({ open: false, url: "", savedRange: null })}
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
                className="flex-1 rounded-lg bg-cobalt py-2 text-sm font-semibold text-white hover:bg-cobalt/90"
              >
                Apply
              </button>
              <button
                onClick={() => setLinkDialog({ open: false, url: "", savedRange: null })}
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
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: rgba(12,13,17,0.28);
          pointer-events: none;
        }
        .editor-content { font-size: 1rem; line-height: 1.8; color: #0c0d11; }
        .editor-content h1,.editor-content h2,.editor-content h3,.editor-content h4 { font-weight:700; line-height:1.2; margin-top:1.75rem; margin-bottom:0.75rem; color:#0c0d11; letter-spacing:-0.01em; }
        .editor-content h1{font-size:1.875rem;} .editor-content h2{font-size:1.5rem;} .editor-content h3{font-size:1.25rem;} .editor-content h4{font-size:1.125rem;}
        .editor-content p { margin-bottom:1rem; }
        .editor-content a { color:#3b5fe8; text-decoration:underline; text-underline-offset:3px; }
        .editor-content blockquote { border-left:3px solid #3b5fe8; padding-left:1rem; margin:1.5rem 0; color:rgba(12,13,17,0.6); font-style:italic; }
        .editor-content code { font-family:'IBM Plex Mono',monospace; font-size:0.875em; background:rgba(59,95,232,0.06); border:1px solid rgba(59,95,232,0.12); border-radius:4px; padding:0.1em 0.35em; }
        .editor-content pre { background:#0c0d11; border-radius:10px; padding:1rem 1.25rem; overflow-x:auto; margin:1.5rem 0; }
        .editor-content pre code { background:none; border:none; padding:0; color:#e2e8ef; font-size:0.875rem; line-height:1.7; }
        .editor-content ul:not([data-type="taskList"]) { list-style:disc; padding-left:1.5rem; margin-bottom:1rem; }
        .editor-content ol { list-style:decimal; padding-left:1.5rem; margin-bottom:1rem; }
        .editor-content li { margin-bottom:0.35rem; }
        .editor-content hr { border:none; border-top:1px solid rgba(12,13,17,0.1); margin:2rem 0; }
        .editor-content img { border-radius:8px; max-width:100%; height:auto; margin:1.5rem 0; display:block; }
        .editor-content table { width:100%; border-collapse:collapse; margin:1.5rem 0; }
        .editor-content th { background:rgba(12,13,17,0.04); font-weight:700; text-align:left; padding:0.6rem 0.875rem; border:1px solid rgba(12,13,17,0.1); }
        .editor-content td { padding:0.6rem 0.875rem; border:1px solid rgba(12,13,17,0.08); }
        .editor-content .callout { border-radius:10px; padding:1rem 1.25rem; margin:1.5rem 0; border:1px solid; }
        .editor-content .callout-info { background:rgba(59,95,232,0.05); border-color:rgba(59,95,232,0.2); }
        .editor-content .callout-warning { background:rgba(245,158,11,0.05); border-color:rgba(245,158,11,0.25); }
        .editor-content .callout-danger { background:rgba(229,71,47,0.05); border-color:rgba(229,71,47,0.2); }
        .editor-content ul[data-type="taskList"] { list-style:none; padding-left:0; }
        .editor-content ul[data-type="taskList"] li { display:flex; align-items:flex-start; gap:0.5rem; }
        .editor-content ul[data-type="taskList"] input[type="checkbox"] { margin-top:0.25rem; accent-color:#3b5fe8; }
      `}</style>
    </div>
  );
}
