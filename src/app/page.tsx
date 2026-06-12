"use client";

import { useState } from "react";

const interviewQuestions = {
  产品经理: "请你介绍一个你认为体验很好的 AI 产品，并分析它解决了什么用户痛点。",
  AI产品助理: "你会如何设计一个 AI 面试训练工具的核心功能？",
  留学顾问: "客户对留学方案犹豫不决时，你会如何推进成交？",
  运营岗位: "请举例说明你会如何提升一个产品的新用户转化率。",
};

export default function Home() {
  const [role, setRole] = useState("产品经理");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState<number | null>(null);

  function generateFeedback() {
    const length = answer.trim().length;

    if (length < 10) {
      setScore(45);
      setFeedback("你的回答太短了。建议补充背景、行动过程和最终结果。");
      return;
    }

    if (length < 50) {
      setScore(68);
      setFeedback(
        "你的回答有基本方向，但细节不足。建议用 STAR 法则表达：背景、任务、行动、结果。"
      );
      return;
    }

    setScore(86);
    setFeedback(
      "你的回答较完整，有一定逻辑。下一步可以加强数据结果、岗位匹配度和个人贡献，让答案更像真实面试中的高质量回答。"
    );
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
            <h2 className="text-xl font-semibold mb-3">AI 反馈</h2>
            <p className="text-gray-400">
              系统输出评分、问题和优化方向。
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
                setFeedback("");
                setScore(null);
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
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold"
            >
              生成 AI 反馈
            </button>

            {feedback && (
              <div className="mt-6 rounded-2xl border border-gray-300 bg-gray-50 p-5">
                <h3 className="font-bold mb-3">反馈结果</h3>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">综合评分</p>
                  <p className="text-4xl font-bold">{score} / 100</p>
                </div>

                <p className="text-gray-700">{feedback}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}