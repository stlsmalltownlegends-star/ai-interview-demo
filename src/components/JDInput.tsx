"use client";

import { FileText, Wand2, MousePointerClick } from "lucide-react";
import { SAMPLE_JDS } from "@/lib/sample-jds";

interface JDInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function JDInput({ value, onChange, onAnalyze, isAnalyzing }: JDInputProps) {
  const charCount = value.length;
  const isValid = charCount >= 50;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80">
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100">
            <FileText className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <h2 className="font-semibold text-slate-800">粘贴岗位 JD</h2>
        </div>
        <span
          className={`text-xs font-medium ${isValid ? "text-emerald-600" : "text-slate-400"}`}
        >
          {charCount} 字 {charCount < 50 && "· 至少 50 字"}
        </span>
      </div>

      <div className="p-5">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`请粘贴完整的岗位描述（JD），例如：

【岗位职责】
1. 负责 AI 产品的需求调研与产品规划
2. 设计 Prompt 策略，评估大模型输出质量
...

【任职要求】
1. 3年以上产品经理经验
2. 熟悉大模型能力与边界
...`}
          className="h-64 w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 transition-colors focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          disabled={isAnalyzing}
        />

        <div className="mt-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-500">
            <MousePointerClick className="h-3.5 w-3.5" />
            快速体验 — 选择示例 JD
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_JDS.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => onChange(sample.content)}
                disabled={isAnalyzing}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow disabled:opacity-50"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={!isValid || isAnalyzing}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:opacity-70 disabled:shadow-none"
        >
          <Wand2 className={`h-4 w-4 ${isAnalyzing ? "animate-pulse" : ""}`} />
          {isAnalyzing ? "AI 正在分析中..." : "开始智能分析"}
        </button>
      </div>
    </div>
  );
}
