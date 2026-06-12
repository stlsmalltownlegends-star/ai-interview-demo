export type SkillPriority = "must" | "preferred" | "bonus";

export interface DetectedSkill {
  name: string;
  category: string;
  priority: SkillPriority;
  score: number;
}

export interface CoreCapability {
  title: string;
  description: string;
  icon: string;
}

export interface LearningItem {
  phase: string;
  duration: string;
  topics: string[];
  resources: string[];
}

export interface ProjectSuggestion {
  title: string;
  description: string;
  skills: string[];
  difficulty: "入门" | "进阶" | "高级";
  highlight: string;
}

export interface AnalysisResult {
  jobTitle: string;
  roleType: string;
  experienceLevel: string;
  summary: string;
  coreCapabilities: CoreCapability[];
  skills: DetectedSkill[];
  learningPlan: LearningItem[];
  projectSuggestions: ProjectSuggestion[];
  matchScore: number;
  analyzedAt: string;
}
