import { ArrowLeft, Sparkles } from "lucide-react";
import { DEMO_STEPS } from "@/lib/demo-content";

interface EmptyStateProps {
  activeStep?: number;
}

export function EmptyState({ activeStep = 1 }: EmptyStateProps) {
  const currentHint = DEMO_STEPS[Math.min(activeStep, 4) - 1];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-white to-slate-50/80 px-8 py-16 text-center">
      <div className="absolute inset-0 bg-grid-light opacity-50" />
      <div className="relative">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 shadow-inner">
          <Sparkles className="h-7 w-7 text-indigo-500" />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-slate-700">等待分析</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
          分析结果将展示在这里，包括核心能力、技能优先级、学习计划与作品建议。
        </p>

        <div className="mx-auto mt-6 max-w-xs rounded-xl bg-indigo-50 px-4 py-3 ring-1 ring-indigo-100">
          <p className="text-xs font-medium text-indigo-600">下一步提示</p>
          <p className="mt-1 text-sm font-semibold text-indigo-800">{currentHint.title}</p>
          <p className="mt-0.5 text-xs text-indigo-600/70">{currentHint.description}</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ArrowLeft className="h-4 w-4" />
          请从左侧开始操作
        </div>
      </div>
    </div>
  );
}
