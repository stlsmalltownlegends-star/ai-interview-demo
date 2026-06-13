import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { role, answer } = body;

  const answerLength = answer?.trim().length || 0;

  let score = 60;
  let feedback = "";

  if (answerLength < 20) {
    score = 45;
    feedback = "你的回答偏短，建议补充背景、行动过程和最终结果。";
  } else if (answerLength < 80) {
    score = 70;
    feedback =
      "你的回答有基本方向，但结构还可以更清晰。建议使用 STAR 法则：背景、任务、行动、结果。";
  } else {
    score = 88;
    feedback =
      "你的回答比较完整，已经具备一定逻辑。下一步可以补充数据结果、个人贡献和岗位匹配点，让回答更有说服力。";
  }

  return NextResponse.json({
    role,
    score,
    feedback,
    suggestions: [
      "补充具体案例",
      "强化结果数据",
      "突出个人贡献",
      "提高和岗位要求的匹配度",
    ],
  });
}