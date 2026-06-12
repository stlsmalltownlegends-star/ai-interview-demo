import { ArrowRight, Bot, UserCircle, History, FileDown } from "lucide-react";
import { ROADMAP_ITEMS } from "@/lib/demo-content";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  api: Bot,
  user: UserCircle,
  history: History,
  pdf: FileDown,
};

export function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-20 bg-slate-900 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
            Product Roadmap
          </div>
          <h2 className="mt-3 text-2xl font-bold text-white">后续迭代方向</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            当前为纯前端 Demo，以下是从 MVP 到完整 SaaS 的产品演进规划，体现产品思维与商业化路径。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {ROADMAP_ITEMS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Bot;
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:bg-white/10"
              >
                <div className="absolute -right-4 -top-4 text-6xl font-bold text-white/5">
                  {i + 1}
                </div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
                      <Icon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-amber-500/20">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
          <span>当前版本</span>
          <ArrowRight className="h-4 w-4" />
          <span className="font-medium text-indigo-400">v0.1 本地 Demo</span>
          <ArrowRight className="h-4 w-4" />
          <span className="text-slate-400">v1.0 SaaS 正式版</span>
        </div>
      </div>
    </section>
  );
}
