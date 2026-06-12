"use client";

import {
  Target,
  TrendingUp,
  BookOpen,
  FolderKanban,
  Award,
  Brain,
  Sparkles,
  Users,
  BarChart3,
  Code,
  Zap,
  Settings,
  Search,
  Layout,
  Rocket,
  Lightbulb,
  FlaskConical,
  Presentation,
} from "lucide-react";
import type { AnalysisResult as AnalysisResultType } from "@/types/analysis";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  brain: Brain,
  sparkles: Sparkles,
  users: Users,
  chart: BarChart3,
  code: Code,
  zap: Zap,
  settings: Settings,
  search: Search,
  layout: Layout,
  rocket: Rocket,
  target: Target,
  flask: FlaskConical,
  presentation: Presentation,
  award: Award,
  lightbulb: Lightbulb,
  book: BookOpen,
};

const PRIORITY_CONFIG = {
  must: { label: "必须掌握", color: "bg-red-50 text-red-700 ring-red-200", bar: "bg-red-500" },
  preferred: { label: "优先具备", color: "bg-amber-50 text-amber-700 ring-amber-200", bar: "bg-amber-500" },
  bonus: { label: "加分项", color: "bg-emerald-50 text-emerald-700 ring-emerald-200", bar: "bg-emerald-500" },
};

const DIFFICULTY_COLOR = {
  "入门": "bg-emerald-100 text-emerald-700",
  "进阶": "bg-amber-100 text-amber-700",
  "高级": "bg-red-100 text-red-700",
};

interface AnalysisResultProps {
  result: AnalysisResultType;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Summary Card */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-500/20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-indigo-200">分析结果</p>
            <h2 className="mt-1 text-2xl font-bold">{result.jobTitle}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {result.roleType}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {result.experienceLevel}
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <span className="text-3xl font-bold">{result.matchScore}</span>
              <span className="text-[10px] text-indigo-200">匹配指数</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-indigo-100">{result.summary}</p>
        <p className="mt-3 text-xs text-indigo-300/70">分析时间：{result.analyzedAt}</p>
      </div>

      {/* Core Capabilities */}
      <section className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/80">
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
            <Target className="h-4 w-4 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">核心能力要求</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {result.coreCapabilities.map((cap) => {
            const Icon = ICON_MAP[cap.icon] || Award;
            return (
              <div
                key={cap.title}
                className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-indigo-200 hover:bg-indigo-50/30"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200/80 group-hover:ring-indigo-200">
                    <Icon className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{cap.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{cap.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skill Priority */}
      <section className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/80">
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
            <TrendingUp className="h-4 w-4 text-violet-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">技能优先级</h3>
        </div>
        {result.skills.length > 0 ? (
          <div className="space-y-3">
            {result.skills.map((skill, i) => {
              const config = PRIORITY_CONFIG[skill.priority];
              return (
                <div key={skill.name} className="rounded-xl border border-slate-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-500">
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-medium text-slate-800">{skill.name}</span>
                        <span className="ml-2 text-xs text-slate-400">{skill.category}</span>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all ${config.bar}`}
                        style={{ width: `${skill.score * 10}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{skill.score}/10</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">未检测到明确技能关键词，建议补充更详细的 JD 内容。</p>
        )}
      </section>

      {/* Learning Plan */}
      <section className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/80">
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100">
            <BookOpen className="h-4 w-4 text-cyan-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">学习计划</h3>
        </div>
        <div className="relative space-y-0">
          {result.learningPlan.map((item, i) => (
            <div key={item.phase} className="relative flex gap-4 pb-8 last:pb-0">
              {i < result.learningPlan.length - 1 && (
                <div className="absolute left-[15px] top-8 h-full w-0.5 bg-gradient-to-b from-indigo-300 to-transparent" />
              )}
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white shadow-md shadow-indigo-500/30">
                {i + 1}
              </div>
              <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800">{item.phase}</h4>
                  <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                    {item.duration}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">学习主题</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {item.topics.map((topic) => (
                      <span key={topic} className="rounded-md bg-white px-2.5 py-1 text-xs text-slate-600 ring-1 ring-slate-200/80">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">推荐资源</p>
                  <ul className="mt-1.5 space-y-1">
                    {item.resources.map((res) => (
                      <li key={res} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="h-1 w-1 rounded-full bg-indigo-400" />
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Suggestions */}
      <section className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/80">
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <FolderKanban className="h-4 w-4 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">项目作品建议</h3>
        </div>
        <div className="grid gap-4">
          {result.projectSuggestions.map((project) => (
            <div
              key={project.title}
              className="rounded-xl border border-slate-100 p-5 transition-colors hover:border-emerald-200 hover:bg-emerald-50/20"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h4 className="font-semibold text-slate-800">{project.title}</h4>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_COLOR[project.difficulty]}`}>
                  {project.difficulty}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <span key={skill} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">{project.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
