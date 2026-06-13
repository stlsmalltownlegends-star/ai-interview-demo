"use client";

import { useState } from "react";

const interviewQuestions = {
  产品经理: "请你介绍一个你认为体验很好的 AI 产品，并分析它解决了什么用户痛点。",
  AI产品助理: "你会如何设计一个 AI 面试训练工具的核心功能？",
  留学顾问: "客户对留学方案犹豫不决时，你会如何推进成交？",
  运营岗位: "请举例说明你会如何提升一个产品的新用户转化率。",
};

type FeedbackResult = {
  role: string;
  score: number;
  feedback: string;
  suggestions: string[];
};

export default function Home() {
  const [role, setRole] = useState("产品经理");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<FeedbackResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function generateFeedback() {
    setLoading(true);
    setResult(null);

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        answer,
      }),
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">
      <section className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-blue-400 mb-4">AI Interview Coach</p>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            用 AI 帮你模拟真实面试，
            <br />
            提升表达、逻辑和岗位匹配度
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl">
            这是一个 AI 面试训练 Demo。用户可以选择岗位，系统自动生成面试问题，
            并根据回答给出评分和改进建议。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">岗位选择</h2>
            <p className="text-gray-400">
              根据不同岗位生成不同面试题。
            </p>
          </div>

          <div className="border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">模拟回答</h2>
            <p className="text-gray-400">
              用户输入自己的面试回答。
            </p>
          </div>

          <div className="border border-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">接口反馈</h2>
            <p className="text-gray-400">
              前端调用后端 API，返回评分和建议。
            </p>
          </div>
        </div>

        <div className="bg-white text-black rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">开始一次模拟面试</h2>

          <div className="space-y-5">
            <select
              className="w-full border rounded-xl px-4 py-3"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setAnswer("");
                setResult(null);
              }}
            >
              <option>产品经理</option>
              <option>AI产品助理</option>
              <option>留学顾问</option>
              <option>运营岗位</option>
            </select>

            <div className="rounded-2xl bg-gray-100 p-5 border">
              <p className="text-sm text-gray-500 mb-2">当前面试问题</p>
              <p className="font-semibold">
                {interviewQuestions[role as keyof typeof interviewQuestions]}
              </p>
            </div>

            <textarea
              className="w-full border rounded-xl px-4 py-3 min-h-36"
              placeholder="请在这里输入你的面试回答..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <button
              onClick={generateFeedback}
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "生成中..." : "生成 AI 反馈"}
            </button>

            {result && (
              <div className="mt-6 rounded-2xl border border-gray-300 bg-gray-50 p-5">
                <h3 className="font-bold mb-3">反馈结果</h3>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">综合评分</p>
                  <p className="text-4xl font-bold">{result.score} / 100</p>
                </div>

                <p className="text-gray-700 mb-4">{result.feedback}</p>

                <div>
                  <p className="font-semibold mb-2">优化建议</p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {result.suggestions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}