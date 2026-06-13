import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role, answer } = body;

    if (!answer || answer.trim().length < 5) {
      return NextResponse.json({
        role,
        score: 40,
        feedback: "你的回答太短了，建议先补充完整回答内容。",
        suggestions: ["补充背景", "说明行动", "加入结果"],
      });
    }

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "你是一名专业的 AI 面试教练。请根据用户的岗位和面试回答，给出评分、反馈和优化建议。必须只返回 JSON，不要返回 Markdown。",
        },
        {
          role: "user",
          content: `
岗位：${role}

用户回答：
${answer}

请严格返回 JSON：
{
  "score": 85,
  "feedback": "一段中文反馈",
  "suggestions": ["建议1", "建议2", "建议3"]
}
          `,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      throw new Error("DeepSeek 没有返回内容");
    }

    const result = JSON.parse(content);

    return NextResponse.json({
      role,
      score: result.score,
      feedback: result.feedback,
      suggestions: result.suggestions,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        role: "未知岗位",
        score: 60,
        feedback:
          "AI 接口暂时不可用，当前返回备用反馈。你的回答有基本方向，但还可以补充更多具体案例和结果数据。",
        suggestions: ["补充具体案例", "使用 STAR 法则", "强化岗位匹配度"],
      },
      { status: 200 }
    );
  }
}