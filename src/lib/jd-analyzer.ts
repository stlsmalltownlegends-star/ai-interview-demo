import type {
  AnalysisResult,
  CoreCapability,
  DetectedSkill,
  LearningItem,
  ProjectSuggestion,
  SkillPriority,
} from "@/types/analysis";

interface SkillDefinition {
  keywords: string[];
  name: string;
  category: string;
  weight: number;
}

const SKILL_DATABASE: SkillDefinition[] = [
  { keywords: ["产品经理", "产品规划", "prd", "需求调研", "竞品分析"], name: "产品规划", category: "产品能力", weight: 10 },
  { keywords: ["用户故事", "用户体验", "ux", "用户研究", "用户画像"], name: "用户研究", category: "产品能力", weight: 8 },
  { keywords: ["ai", "人工智能", "大模型", "llm", "gpt", "claude", "chatgpt"], name: "AI/大模型", category: "AI 能力", weight: 10 },
  { keywords: ["prompt", "提示词", "rag", "agent", "微调", "fine-tune"], name: "Prompt 工程", category: "AI 能力", weight: 9 },
  { keywords: ["数据分析", "数据驱动", "指标", "ab测试", "a/b"], name: "数据分析", category: "数据能力", weight: 8 },
  { keywords: ["sql", "excel", "tableau", "power bi", "python"], name: "数据工具", category: "数据能力", weight: 7 },
  { keywords: ["react", "vue", "angular", "前端", "javascript", "typescript"], name: "前端开发", category: "技术能力", weight: 9 },
  { keywords: ["next.js", "nextjs", "ssr", "tailwind"], name: "现代前端框架", category: "技术能力", weight: 8 },
  { keywords: ["node", "java", "go", "python", "后端", "api"], name: "后端开发", category: "技术能力", weight: 8 },
  { keywords: ["机器学习", "深度学习", "nlp", "计算机视觉", "算法"], name: "机器学习", category: "AI 能力", weight: 9 },
  { keywords: ["沟通", "协作", "跨团队", "项目管理", "推动落地"], name: "沟通协作", category: "软技能", weight: 7 },
  { keywords: ["逻辑思维", "结构化", "解决问题", "批判性思维"], name: "逻辑思维", category: "软技能", weight: 6 },
  { keywords: ["性能优化", "工程化", "ci/cd", "组件库", "代码规范"], name: "工程化", category: "技术能力", weight: 7 },
  { keywords: ["统计学", "假设检验", "回归", "建模"], name: "统计学", category: "数据能力", weight: 7 },
  { keywords: ["figma", "原型", "交互设计", "ui"], name: "设计协作", category: "产品能力", weight: 6 },
  { keywords: ["敏捷", "scrum", "迭代", "sprint"], name: "敏捷开发", category: "产品能力", weight: 5 },
];

const MUST_HAVE_MARKERS = ["必须", "精通", "熟练掌握", "要求", "必备", "硬性"];
const PREFERRED_MARKERS = ["优先", "加分", "了解", "熟悉", "有经验"];
const BONUS_MARKERS = ["加分项", "nice to have", "更佳", "更好"];

const ROLE_PATTERNS: { pattern: RegExp; type: string; capabilities: CoreCapability[] }[] = [
  {
    pattern: /ai|人工智能|大模型|llm|prompt|算法产品/i,
    type: "AI 产品",
    capabilities: [
      { title: "AI 场景洞察", description: "识别大模型可落地的业务场景，评估技术可行性与商业价值", icon: "brain" },
      { title: "Prompt 策略设计", description: "设计提示词模板与评估体系，持续优化模型输出质量", icon: "sparkles" },
      { title: "跨职能协作", description: "连接算法、工程、业务三方，推动 AI 功能从 0 到 1 落地", icon: "users" },
      { title: "效果度量", description: "定义 AI 产品核心指标，建立效果评估与迭代闭环", icon: "chart" },
    ],
  },
  {
    pattern: /前端|react|vue|javascript|typescript|web/i,
    type: "前端开发",
    capabilities: [
      { title: "界面工程化", description: "构建高性能、可维护的前端应用，注重组件复用与代码质量", icon: "code" },
      { title: "性能优化", description: "优化首屏加载、运行时性能，提升用户体验核心指标", icon: "zap" },
      { title: "工程体系", description: "参与 CI/CD、组件库、代码规范等前端基础设施建设", icon: "settings" },
      { title: "协作对接", description: "与设计师、后端高效协作，准确实现产品交互与 API 对接", icon: "users" },
    ],
  },
  {
    pattern: /数据|分析|sql|tableau|bi|统计/i,
    type: "数据分析",
    capabilities: [
      { title: "数据洞察", description: "从海量业务数据中提取关键洞察，支撑战略与运营决策", icon: "chart" },
      { title: "指标体系", description: "设计并维护核心业务指标，建立数据驱动的评估体系", icon: "target" },
      { title: "实验设计", description: "规划 A/B 测试方案，科学评估产品迭代效果", icon: "flask" },
      { title: "报告呈现", description: "将复杂分析结论转化为清晰的可视化报告与业务建议", icon: "presentation" },
    ],
  },
  {
    pattern: /产品|pm|prd|需求|规划/i,
    type: "产品经理",
    capabilities: [
      { title: "需求洞察", description: "深入理解用户痛点与市场机会，输出有价值的产品方向", icon: "search" },
      { title: "方案设计", description: "撰写清晰的 PRD 与原型，平衡用户体验与技术成本", icon: "layout" },
      { title: "项目推进", description: "协调研发、设计、测试资源，确保产品按时高质量交付", icon: "rocket" },
      { title: "数据复盘", description: "通过数据验证产品假设，持续迭代优化产品策略", icon: "chart" },
    ],
  },
];

const DEFAULT_CAPABILITIES: CoreCapability[] = [
  { title: "专业能力", description: "具备岗位所需的核心专业技能与行业知识", icon: "award" },
  { title: "问题解决", description: "面对复杂业务问题能结构化分析并给出可行方案", icon: "lightbulb" },
  { title: "学习成长", description: "保持对新技术与行业趋势的敏感度，快速自我迭代", icon: "book" },
  { title: "团队协作", description: "良好的沟通能力，能在跨职能团队中高效协作", icon: "users" },
];

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ");
}

function extractJobTitle(jd: string): string {
  const lines = jd.split("\n").map((l) => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 5)) {
    const match = line.match(/(?:岗位|职位|招聘)[：:]\s*(.+)/i);
    if (match) return match[1].trim();
  }
  const titleMatch = jd.match(/【(.+?)】/);
  if (titleMatch && titleMatch[1].length < 20) return titleMatch[1];
  return "目标岗位";
}

function extractExperienceLevel(jd: string): string {
  const match = jd.match(/(\d+)[-~]?(\d+)?年/);
  if (match) {
    const min = parseInt(match[1], 10);
    if (min >= 5) return "高级（5年+）";
    if (min >= 3) return "中级（3-5年）";
    return "初级（1-3年）";
  }
  if (/应届|实习|校招/i.test(jd)) return "应届/实习";
  return "不限";
}

function detectRoleType(jd: string): { type: string; capabilities: CoreCapability[] } {
  for (const role of ROLE_PATTERNS) {
    if (role.pattern.test(jd)) {
      return { type: role.type, capabilities: role.capabilities };
    }
  }
  return { type: "通用岗位", capabilities: DEFAULT_CAPABILITIES };
}

function getPriority(jd: string, skillName: string, score: number): SkillPriority {
  const contextWindow = 80;
  const normalized = normalizeText(jd);
  const skillLower = skillName.toLowerCase();

  let idx = normalized.indexOf(skillLower);
  if (idx === -1) {
    const def = SKILL_DATABASE.find((s) => s.name === skillName);
    if (def) {
      for (const kw of def.keywords) {
        idx = normalized.indexOf(kw.toLowerCase());
        if (idx !== -1) break;
      }
    }
  }

  if (idx !== -1) {
    const context = normalized.slice(Math.max(0, idx - contextWindow), idx + contextWindow);
    if (BONUS_MARKERS.some((m) => context.includes(m.toLowerCase()))) return "bonus";
    if (PREFERRED_MARKERS.some((m) => context.includes(m.toLowerCase()))) return "preferred";
    if (MUST_HAVE_MARKERS.some((m) => context.includes(m.toLowerCase()))) return "must";
  }

  return score >= 8 ? "must" : score >= 5 ? "preferred" : "bonus";
}

function detectSkills(jd: string): DetectedSkill[] {
  const normalized = normalizeText(jd);
  const detected: DetectedSkill[] = [];

  for (const skill of SKILL_DATABASE) {
    let matchCount = 0;
    for (const keyword of skill.keywords) {
      const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      const matches = normalized.match(regex);
      if (matches) matchCount += matches.length;
    }

    if (matchCount > 0) {
      const score = Math.min(10, skill.weight + matchCount * 1.5);
      detected.push({
        name: skill.name,
        category: skill.category,
        priority: getPriority(jd, skill.name, score),
        score: Math.round(score * 10) / 10,
      });
    }
  }

  return detected.sort((a, b) => b.score - a.score);
}

function generateLearningPlan(skills: DetectedSkill[], roleType: string): LearningItem[] {
  const topSkills = skills.slice(0, 5).map((s) => s.name);

  const plans: Record<string, LearningItem[]> = {
    "AI 产品": [
      { phase: "基础夯实", duration: "2-3 周", topics: ["大模型原理入门", "Prompt 工程基础", "AI 产品设计方法论"], resources: ["吴恩达 Generative AI 课程", "OpenAI Cookbook", "《AI 产品经理手册》"] },
      { phase: "实战演练", duration: "3-4 周", topics: ["RAG 应用搭建", "Agent 工作流设计", "AI 效果评估体系"], resources: ["LangChain 官方文档", "搭建个人 AI 助手 Demo", "分析 3 个 AI 产品案例"] },
      { phase: "面试冲刺", duration: "1-2 周", topics: ["AI 产品 Case Study", "技术边界判断", "商业化路径分析"], resources: ["整理 AI 产品作品集", "模拟面试 5 次", "撰写竞品分析报告"] },
    ],
    "前端开发": [
      { phase: "基础夯实", duration: "2-3 周", topics: ["TypeScript 进阶", "React 核心原理", "CSS 现代布局"], resources: ["React 官方文档", "TypeScript Handbook", "CSS Tricks 教程"] },
      { phase: "实战演练", duration: "3-4 周", topics: ["Next.js 全栈项目", "性能优化实践", "组件库开发"], resources: ["Next.js 官方教程", "Web.dev 性能指南", "开源组件库源码阅读"] },
      { phase: "面试冲刺", duration: "1-2 周", topics: ["手写代码题", "系统设计（前端）", "项目亮点提炼"], resources: ["LeetCode 前端题", "整理 2-3 个作品集", "模拟技术面试"] },
    ],
    "数据分析": [
      { phase: "基础夯实", duration: "2-3 周", topics: ["SQL 高级查询", "Python 数据处理", "统计学基础"], resources: ["SQLBolt 练习", "Pandas 官方文档", "可汗学院统计学"] },
      { phase: "实战演练", duration: "3-4 周", topics: ["业务指标体系搭建", "A/B 测试实战", "数据可视化看板"], resources: ["Kaggle 数据集练习", "Tableau Public 项目", "搭建个人数据分析作品集"] },
      { phase: "面试冲刺", duration: "1-2 周", topics: ["案例分析题", "指标设计题", "SQL 现场题"], resources: ["整理 3 份分析报告", "模拟业务面试", "复盘经典分析案例"] },
    ],
  };

  const defaultPlan: LearningItem[] = [
    { phase: "基础夯实", duration: "2-3 周", topics: [`${topSkills[0] || "核心技能"} 基础`, "行业知识积累", "软技能提升"], resources: ["相关在线课程", "行业报告阅读", "加入学习社群"] },
    { phase: "实战演练", duration: "3-4 周", topics: topSkills.slice(0, 3).map((s) => `${s} 项目实战`), resources: ["动手做 1-2 个项目", "参与开源贡献", "撰写技术博客"] },
    { phase: "面试冲刺", duration: "1-2 周", topics: ["简历优化", "项目亮点提炼", "模拟面试"], resources: ["整理作品集", "模拟面试 3-5 次", "准备常见问题答案"] },
  ];

  const plan = plans[roleType] || defaultPlan;

  if (topSkills.length > 0 && !plans[roleType]) {
    plan[0].topics = [...topSkills.slice(0, 2).map((s) => `${s} 强化`), ...plan[0].topics.slice(0, 1)];
  }

  return plan;
}

function generateProjectSuggestions(skills: DetectedSkill[], roleType: string): ProjectSuggestion[] {
  const suggestions: Record<string, ProjectSuggestion[]> = {
    "AI 产品": [
      { title: "AI 简历优化助手", description: "设计一款基于大模型的简历分析与优化产品，包含 Prompt 策略、效果评估与用户反馈闭环", skills: ["AI/大模型", "Prompt 工程", "产品规划"], difficulty: "进阶", highlight: "展示 AI 产品设计全流程能力" },
      { title: "RAG 知识库问答系统", description: "针对特定领域文档构建 RAG 问答系统，设计检索策略与回答质量评估方案", skills: ["RAG", "Prompt 工程", "效果度量"], difficulty: "高级", highlight: "体现对大模型落地技术的理解" },
      { title: "AI 功能竞品分析报告", description: "选取 3-5 款同类 AI 产品，从功能、交互、商业化等维度输出深度竞品分析", skills: ["竞品分析", "用户研究", "产品规划"], difficulty: "入门", highlight: "快速展示产品洞察与结构化思维" },
    ],
    "前端开发": [
      { title: "个人作品集网站", description: "使用 Next.js + Tailwind 构建响应式作品集，注重性能优化与 SEO", skills: ["现代前端框架", "前端开发", "性能优化"], difficulty: "入门", highlight: "直观展示前端工程能力" },
      { title: "可视化数据看板", description: "开发交互式数据可视化 Dashboard，支持多维度筛选与实时数据更新", skills: ["前端开发", "数据工具", "工程化"], difficulty: "进阶", highlight: "体现复杂 UI 与数据处理结合能力" },
      { title: "开源组件库贡献", description: "为知名 UI 组件库提交 PR 或自建小型组件库，注重可访问性与文档", skills: ["工程化", "前端开发", "代码规范"], difficulty: "高级", highlight: "证明工程化思维与社区影响力" },
    ],
    "数据分析": [
      { title: "电商用户行为分析", description: "基于公开数据集分析用户购买行为，输出留存、转化、RFM 等分析报告", skills: ["数据分析", "数据工具", "统计学"], difficulty: "入门", highlight: "经典分析场景，易于展示方法论" },
      { title: "A/B 测试全链路案例", description: "模拟产品功能 A/B 测试，从假设提出、样本计算到结论解读的完整流程", skills: ["数据分析", "统计学", "指标体系"], difficulty: "进阶", highlight: "展示实验设计与统计推断能力" },
      { title: "业务指标体系设计", description: "为虚拟 SaaS 产品设计 North Star Metric 及下层指标拆解体系", skills: ["指标体系", "产品规划", "数据洞察"], difficulty: "高级", highlight: "体现战略思维与指标设计能力" },
    ],
    "产品经理": [
      { title: "AI 工具产品方案", description: "针对特定用户群体设计一款 AI 效率工具，输出完整 PRD 与原型", skills: ["产品规划", "用户研究", "AI/大模型"], difficulty: "进阶", highlight: "展示从 0 到 1 的产品设计能力" },
      { title: "用户旅程优化项目", description: "选取现有产品进行用户旅程分析，提出 3 个可落地的体验优化方案", skills: ["用户研究", "产品规划", "数据分析"], difficulty: "入门", highlight: "体现用户思维与方案落地能力" },
      { title: "增长策略案例分析", description: "深度分析一款成功产品的增长策略，提炼可复用的增长方法论", skills: ["数据分析", "竞品分析", "产品规划"], difficulty: "进阶", highlight: "展示商业洞察与结构化分析" },
    ],
  };

  const defaultSuggestions: ProjectSuggestion[] = [
    { title: `${roleType} 实战项目`, description: `围绕岗位核心技能 ${skills.slice(0, 3).map((s) => s.name).join("、")} 设计一个端到端实战项目`, skills: skills.slice(0, 3).map((s) => s.name), difficulty: "进阶", highlight: "针对性展示岗位匹配度" },
    { title: "行业深度分析报告", description: "选取目标行业 TOP 5 公司/产品，输出结构化竞品与趋势分析", skills: ["竞品分析", "逻辑思维"], difficulty: "入门", highlight: "快速建立行业认知印象" },
    { title: "个人知识库搭建", description: "系统整理学习笔记与项目复盘，构建可展示的个人知识体系", skills: skills.slice(0, 2).map((s) => s.name), difficulty: "入门", highlight: "体现学习能力与自我驱动" },
  ];

  return suggestions[roleType] || defaultSuggestions;
}

function generateSummary(roleType: string, skills: DetectedSkill[], experienceLevel: string): string {
  const mustSkills = skills.filter((s) => s.priority === "must").map((s) => s.name);
  const topCategories = [...new Set(skills.slice(0, 4).map((s) => s.category))];

  const mustPart = mustSkills.length > 0 ? `核心硬性要求聚焦在 ${mustSkills.slice(0, 3).join("、")}` : "岗位未明确标注硬性技能要求";
  return `该岗位定位为「${roleType}」（${experienceLevel}），${mustPart}。能力维度主要覆盖 ${topCategories.join("、")} 等方向。建议优先补齐高优先级技能，并通过项目作品验证实战能力。`;
}

function calculateMatchScore(skills: DetectedSkill[]): number {
  if (skills.length === 0) return 60;
  const mustCount = skills.filter((s) => s.priority === "must").length;
  const avgScore = skills.reduce((sum, s) => sum + s.score, 0) / skills.length;
  const base = Math.min(95, 55 + mustCount * 5 + avgScore * 2);
  return Math.round(base);
}

export async function analyzeJD(jd: string): Promise<AnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 1800 + Math.random() * 700));

  const trimmed = jd.trim();
  if (!trimmed) throw new Error("请输入岗位 JD 内容");

  const jobTitle = extractJobTitle(trimmed);
  const experienceLevel = extractExperienceLevel(trimmed);
  const { type: roleType, capabilities } = detectRoleType(trimmed);
  const skills = detectSkills(trimmed);
  const learningPlan = generateLearningPlan(skills, roleType);
  const projectSuggestions = generateProjectSuggestions(skills, roleType);
  const summary = generateSummary(roleType, skills, experienceLevel);
  const matchScore = calculateMatchScore(skills);

  return {
    jobTitle,
    roleType,
    experienceLevel,
    summary,
    coreCapabilities: capabilities,
    skills,
    learningPlan,
    projectSuggestions,
    matchScore,
    analyzedAt: new Date().toLocaleString("zh-CN"),
  };
}
