import { Mic, Clock } from "lucide-react";
import { INTERVIEW_SCRIPT } from "@/lib/demo-content";

export function InterviewScript() {
  const totalDuration = "~4 分钟";

  return (
    <section id="script" className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
              <Mic className="h-3 w-3" />
              面试准备
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">面试讲解稿</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              以下是向面试官介绍本项目的参考话术，按阶段组织，可根据实际面试节奏灵活调整。
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
            <Clock className="h-4 w-4 text-slate-400" />
            建议总时长 {totalDuration}
          </div>
        </div>

        <div className="space-y-4">
          {INTERVIEW_SCRIPT.map((item, i) => (
            <div
              key={item.phase}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-slate-800">{item.phase}</h3>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                  {item.duration}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
