/** Talent ↔ company matching model (foundation). */

export type TalentSeniority = "mid" | "senior" | "staff" | "principal";

export interface TalentProfile {
  id: string;
  displayName: string;
  headline: string;
  skills: string[];
  seniority: TalentSeniority;
  verifiedAt?: string;
  interviewSessionIds: string[];
}

export interface CompanyRole {
  id: string;
  companyId: string;
  title: string;
  requiredSkills: string[];
  seniority: TalentSeniority;
  status: "open" | "paused" | "filled";
}

export interface MatchSuggestion {
  roleId: string;
  talentId: string;
  score: number;
  reasons: string[];
}
