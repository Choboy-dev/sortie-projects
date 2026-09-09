/** Stable URL slug for a skill label (e.g. "Full-Stack Engineers" → "full-stack-engineers"). */
export function slugifySkill(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/\./g, "-")
    .replace(/&/g, "and")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function singularizeSkillLabel(label: string): string {
  const trimmed = label.trim();
  if (/ies$/i.test(trimmed)) return trimmed.replace(/ies$/i, "y");
  if (/ses$/i.test(trimmed)) return trimmed.replace(/es$/i, "");
  if (/s$/i.test(trimmed) && !/ss$/i.test(trimmed)) {
    return trimmed.replace(/s$/i, "");
  }
  return trimmed;
}
