import { useState } from "react";
import { Check, Copy, Download, TerminalSquare } from "lucide-react";

interface SkillPreviewLine {
  key?: string;
  value?: string;
  text?: string;
  indent?: boolean;
  divider?: boolean;
  heading?: boolean;
}

interface InstallBlockProps {
  installCmd: string;
  skillUrl: string;
  fallbackContent: string;
  fileName?: string;
  fileLabel?: string;
  terminalHint?: string;
  previewLines: SkillPreviewLine[];
}

export function InstallBlock({
  installCmd,
  skillUrl,
  fallbackContent,
  fileName = "SKILL.md",
  fileLabel = "Code Passport skill file",
  terminalHint = "Works with Claude Code, Codex, Gemini CLI, Cursor, and more.",
  previewLines,
}: InstallBlockProps) {
  const [tab, setTab] = useState<"terminal" | "copy" | "download">("terminal");
  const [copied, setCopied] = useState(false);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function fetchSkillContent(): Promise<string> {
    try {
      const r = await fetch(skillUrl);
      if (!r.ok) throw new Error("not found");
      return await r.text();
    } catch {
      return fallbackContent;
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-1 mb-2">
        <button
          onClick={() => setTab("terminal")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            tab === "terminal"
              ? "bg-slate-800 text-white"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <TerminalSquare className="w-3.5 h-3.5" />
          Terminal
        </button>
        <button
          onClick={() => setTab("copy")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            tab === "copy"
              ? "bg-slate-800 text-white"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Copy className="w-3.5 h-3.5" />
          Copy {fileName}
        </button>
        <button
          onClick={() => setTab("download")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            tab === "download"
              ? "bg-slate-800 text-white"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
      </div>

      {tab === "terminal" && (
        <div>
          <div
            onClick={() => handleCopy(installCmd)}
            className="bg-slate-900 rounded-xl px-5 py-4 flex items-center gap-4 cursor-pointer border border-slate-800 hover:bg-slate-800 transition-colors group"
          >
            <span className="text-indigo-400 select-none font-mono text-sm">$</span>
            <code className="flex-1 text-sm font-mono text-slate-300 overflow-x-auto whitespace-nowrap scrollbar-hide text-left">
              {installCmd}
            </code>
            <span className="text-slate-500 group-hover:text-slate-300 transition-colors shrink-0">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-left">
            {terminalHint}
          </p>
        </div>
      )}

      {tab === "copy" && (
        <div>
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">{fileName}</span>
              <button
                onClick={() => fetchSkillContent().then((text) => handleCopy(text))}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy contents"}
              </button>
            </div>
            <div className="px-5 py-4 font-mono text-[13px] text-slate-400 leading-relaxed text-left max-h-[160px] overflow-y-auto scrollbar-hide">
              {previewLines.map((line, i) => {
                if (line.divider) return <div key={i} className="text-slate-600">---</div>;
                if (line.heading) return <div key={i} className={`${i > 0 ? "mt-2" : ""} text-slate-300`}>{line.text}</div>;
                if (line.key) return <div key={i}><span className="text-indigo-400">{line.key}</span>: {line.value}</div>;
                if (line.indent) return <div key={i} className="pl-4">{line.text}</div>;
                return <div key={i} className={i > 0 ? "mt-1" : ""}>{line.text}</div>;
              })}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-left">
            Save to your project's skills directory. No Node.js required.
          </p>
        </div>
      )}

      {tab === "download" && (
        <div>
          <button
            onClick={() => {
              fetchSkillContent().then((text) => {
                const blob = new Blob([text], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                a.click();
                URL.revokeObjectURL(url);
              });
            }}
            className="w-full bg-slate-900 rounded-xl px-5 py-4 flex items-center gap-4 border border-slate-800 hover:bg-slate-800 transition-colors group cursor-pointer"
          >
            <Download className="w-5 h-5 text-indigo-400" />
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-slate-200">{fileName}</div>
              <div className="text-xs text-slate-500">{fileLabel}</div>
            </div>
            <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">Download</span>
          </button>
          <p className="text-[11px] text-slate-400 mt-2 text-left">
            Save to your project's skills directory. No Node.js required.
          </p>
        </div>
      )}
    </div>
  );
}
