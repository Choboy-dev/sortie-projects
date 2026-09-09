/** Anti-cheat / proctoring signal model (foundation). */

export type IntegritySignalKind =
  | "tab_blur"
  | "fullscreen_exit"
  | "paste_burst"
  | "clipboard_monitor"
  | "multi_face"
  | "no_face"
  | "audio_anomaly"
  | "timing_anomaly"
  | "answer_similarity";

export type IntegritySeverity = "info" | "warn" | "critical";

export interface IntegritySignal {
  id: string;
  sessionId: string;
  kind: IntegritySignalKind;
  severity: IntegritySeverity;
  weight: number;
  capturedAt: string;
  meta?: Record<string, string | number | boolean>;
}

export interface IntegrityReport {
  sessionId: string;
  score: number;
  signals: IntegritySignal[];
  recommendation: "pass" | "manual_review" | "fail";
}
