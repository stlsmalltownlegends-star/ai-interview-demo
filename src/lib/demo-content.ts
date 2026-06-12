export const DEMO_STEPS = [
  { id: 1, title: "选择示例 JD", description: "点击预设岗位或粘贴 JD" },
  { id: 2, title: "点击分析", description: "一键触发 AI 智能拆解" },
  { id: 3, title: "查看能力拆解", description: "核心能力与技能优先级" },
  { id: 4, title: "生成学习路径", description: "学习计划与作品建议" },
] as const;

export const INTERVIEW_SCRIPT = [
  {
    phase: "开场 · 30 秒",
    duration: "30s",
    content:
      "大家好，这是我做的一个 AI 产品 Demo——「AI JD 分析助手」。它面向求职者和产品经理，解决一个真实痛点：拿到岗位 JD 后，不知道重点该准备什么、怎么准备。我的产品用 AI 把 JD 自动拆解成可执行的学习方案。",
  },
  {
    phase: "问题定义",
    duration: "45s",
    content:
      "我观察到两类用户都有这个需求：求职者看到 JD 里一堆技能要求，分不清优先级；产品经理做竞品招聘分析时，也需要快速理解岗位能力模型。现有方案要么是人工逐条阅读，效率低；要么是通用 AI 聊天，输出不够结构化。",
  },
  {
    phase: "解决方案",
    duration: "45s",
    content:
      "所以我设计了「输入 JD → 结构化输出」的产品闭环。用户只需粘贴岗位描述，系统自动生成四块内容：核心能力拆解、技能优先级排序、分阶段学习计划、项目作品建议。让模糊的岗位要求变成清晰的行动清单。",
  },
  {
    phase: "功能演示",
    duration: "60s",
    content:
      "（现场操作）我先选一个「AI 产品经理」示例 JD，点击分析。大家可以看到，系统识别了岗位类型和年限，输出了 4 项核心能力、按必须/优先/加分排序的技能列表，以及 3 阶段学习路径和 3 个作品集建议。整个流程不到 3 秒。",
  },
  {
    phase: "产品设计亮点",
    duration: "45s",
    content:
      "产品设计上我做了几个关键决策：一是输出结构固定为 4 模块，降低用户认知负担；二是技能分三级优先级，对应 JD 中「必须/优先/加分」的语义；三是学习计划和作品建议按岗位类型动态生成，而非通用模板。",
  },
  {
    phase: "技术与迭代",
    duration: "30s",
    content:
      "当前 Demo 用规则引擎 + 关键词匹配模拟 AI 分析，验证了交互闭环。下一步计划接入 GPT API 提升语义理解，并增加用户账号、历史记录和 PDF 导出，形成完整的 SaaS 产品。",
  },
] as const;

export const ROADMAP_ITEMS = [
  {
    title: "接入 GPT API",
    description: "替换规则引擎，用大模型做语义级 JD 理解，支持非标准格式和隐含要求识别",
    status: "规划中",
    icon: "api",
  },
  {
    title: "用户账号体系",
    description: "支持注册登录，保存个人偏好与求职方向，提供个性化推荐",
    status: "规划中",
    icon: "user",
  },
  {
    title: "历史分析记录",
    description: "记录每次分析的 JD 与结果，支持对比不同岗位的能力要求差异",
    status: "规划中",
    icon: "history",
  },
  {
    title: "导出 PDF 报告",
    description: "一键导出完整分析报告，方便求职者打印或分享给导师复盘",
    status: "规划中",
    icon: "pdf",
  },
] as const;

export const HERO_FEATURES = [
  { label: "核心能力拆解", desc: "4 维能力模型" },
  { label: "技能优先级", desc: "必须 / 优先 / 加分" },
  { label: "学习路径", desc: "3 阶段计划" },
  { label: "作品建议", desc: "面试作品集" },
] as const;
