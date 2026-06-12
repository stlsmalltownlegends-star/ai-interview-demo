import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react";
import { HERO_FEATURES } from "@/lib/demo-content";

interface HeroSectionProps {
  onStartDemo?: () => void;
}

export function HeroSection({ onStartDemo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.25),transparent)]" />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
              <Sparkles className="h-3 w-3" />
              AI 驱动 · 产品经理面试作品
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
              把岗位 JD
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                变成可执行的学习方案
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400 lg:text-lg">
              <span className="font-medium text-slate-300">
                为求职者和产品经理提供岗位 JD 智能拆解
              </span>
              —— 一键解析核心能力、技能优先级、学习计划与项目作品建议。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onStartDemo}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/50"
              >
                立即体验 Demo
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#script"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                查看面试讲解稿
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { icon: Zap, label: "3 秒出结果" },
                { icon: Shield, label: "无需登录" },
                { icon: Clock, label: "本地 Demo" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-slate-500">
                  <Icon className="h-4 w-4 text-indigo-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product preview card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-violet-500/20 blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-xs text-slate-500">AI JD 分析助手</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl bg-slate-800/80 p-4 ring-1 ring-white/5">
                  <p className="text-xs font-medium text-indigo-400">分析结果 · AI 产品经理</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    核心硬性要求聚焦在 AI/大模型、产品规划、Prompt 工程。建议优先补齐高优先级技能...
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {HERO_FEATURES.map((f) => (
                    <div
                      key={f.label}
                      className="rounded-xl bg-slate-800/60 p-3 ring-1 ring-white/5 transition-colors hover:ring-indigo-500/30"
                    >
                      <p className="text-xs font-semibold text-white">{f.label}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">{f.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-600/20 to-violet-600/20 px-4 py-3 ring-1 ring-indigo-500/20">
                  <span className="text-xs text-slate-400">岗位匹配指数</span>
                  <span className="text-2xl font-bold text-indigo-400">87</span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -right-3 top-8 animate-float rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-sm">
              ✓ 技能优先级已排序
            </div>
            <div className="absolute -left-3 bottom-12 animate-float-delayed rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-400 backdrop-blur-sm">
              ✓ 学习路径已生成
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
