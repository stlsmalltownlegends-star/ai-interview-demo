"use client";

import { Brain, Search, ListOrdered, BookOpen, FolderKanban } from "lucide-react";

const STEPS = [
  { icon: Search, label: "解析岗位描述" },
  { icon: Brain, label: "识别核心能力" },
  { icon: ListOrdered, label: "排列技能优先级" },
  { icon: BookOpen, label: "生成学习计划" },
  { icon: FolderKanban, label: "推荐项目作品" },
];

export function LoadingState() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/80">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-violet-50/30" />
      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-slate-800">AI 正在深度分析 JD</h3>
        <p className="mt-1 text-sm text-slate-500">预计需要 2-3 秒，请稍候...</p>
      </div>

      <div className="relative mt-8 space-y-3">
        {STEPS.map((step, i) => (
          <div
            key={step.label}
            className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <step.icon className="h-4 w-4 text-indigo-500" />
            <span className="text-sm text-slate-600">{step.label}</span>
            <div className="ml-auto h-1.5 w-16 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full animate-pulse rounded-full bg-indigo-500"
                style={{ width: `${60 + i * 8}%`, animationDelay: `${i * 0.2}s` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
