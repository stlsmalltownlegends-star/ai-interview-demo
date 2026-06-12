"use client";

import { Briefcase, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { label: "产品演示", href: "#demo" },
  { label: "面试讲解稿", href: "#script" },
  { label: "迭代方向", href: "#roadmap" },
];

interface NavbarProps {
  onStartDemo?: () => void;
}

export function Navbar({ onStartDemo }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">AI JD 分析助手</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={onStartDemo}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-sm font-medium text-slate-900 transition-colors hover:bg-indigo-50"
        >
          <Sparkles className="h-3.5 w-3.5" />
          开始体验
        </button>
      </div>
    </nav>
  );
}
