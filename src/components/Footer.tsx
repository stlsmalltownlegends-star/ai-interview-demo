import { Briefcase } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Briefcase className="h-4 w-4 text-indigo-500" />
          AI JD 分析助手
        </div>
        <p className="text-xs text-slate-400">
          产品经理面试作品 · 纯前端 Demo · 无需登录 · 无需 API Key
        </p>
      </div>
    </footer>
  );
}
