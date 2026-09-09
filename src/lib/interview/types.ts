/** Core types for the AI interview engine (foundation). */

export type InterviewModality = "voice" | "coding" | "system_design" | "behavioral";

export type InterviewSessionStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "flagged"
  | "voided";

export interface InterviewSession {
  id: string;
  candidateId: string;
  roleTrack: string;
  modalities: InterviewModality[];
  status: InterviewSessionStatus;
  startedAt?: string;
  completedAt?: string;
  integrityScore?: number;
  overallScore?: number;
}

export interface InterviewTurn {
  id: string;
  sessionId: string;
  role: "interviewer" | "candidate";
  content: string;
  createdAt: string;
  signals?: {
    latencyMs?: number;
    pasteDetected?: boolean;
    focusLostCount?: number;
  };
}
