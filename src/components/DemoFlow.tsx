"use client";

import { DEMO_STEPS } from "@/lib/demo-content";
import { Check, ChevronRight } from "lucide-react";

interface DemoFlowProps {
  activeStep: number;
}

export function DemoFlow({ activeStep }: DemoFlowProps) {
  return (
    <section className="border-y border-slate-200 bg-white py-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              演示流程
            </p>
            <p className="mt-0.5 text-sm text-slate-500">
              按以下步骤操作，完整体验产品核心链路
            </p>
          </div>
          <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 sm:inline-block">
            当前步骤 {Math.min(activeStep, 4)} / 4
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-0">
          {DEMO_STEPS.map((step, i) => {
            const stepNum = i + 1;
            const isCompleted = activeStep > stepNum;
            const isActive = activeStep === stepNum;
            const isLast = i === DEMO_STEPS.length - 1;

            return (
              <div key={step.id} className="relative flex items-center">
                <div
                  className={`flex flex-1 items-start gap-3 rounded-xl p-3 transition-all sm:p-4 ${
                    isActive
                      ? "bg-indigo-50 ring-2 ring-indigo-500/30"
                      : isCompleted
                        ? "bg-emerald-50/50"
                        : "bg-slate-50"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                          : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold ${
                        isActive ? "text-indigo-700" : isCompleted ? "text-emerald-700" : "text-slate-600"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>

                {!isLast && (
                  <ChevronRight className="mx-1 hidden h-4 w-4 shrink-0 text-slate-300 sm:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
