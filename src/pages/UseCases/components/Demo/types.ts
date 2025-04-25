
export type UserRole = "startup" | "data-scientist" | "enterprise" | "all";

export interface Platform {
  id: string;
  name: string;
  icon: string;
  link: string;
  tagline: string;
  description: string;
  useCases: string[];
  keyFeatures: string[];
  scores: {
    ux: number;
    scalability: number;
    ecosystem: number;
    cost: number;
    aiSupport: number;
  };
  roleSpecificUseCase: {
    startup: string[];
    'data-scientist': string[];
    enterprise: string[];
  };
  roleSpecificStrengths: {
    startup: string[];
    'data-scientist': string[];
    enterprise: string[];
  };
}

export interface Comparison {
  id: string;
  label: string;
  platforms: number[];
  aiSummary: string;
}
