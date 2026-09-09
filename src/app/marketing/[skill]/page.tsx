import {
  SkillRoutePage,
  skillMetadata,
  skillStaticParams,
} from "@/components/skills/skill-route";

type Props = { params: Promise<{ skill: string }> };

export function generateStaticParams() {
  return skillStaticParams("marketing");
}

export async function generateMetadata({ params }: Props) {
  const { skill } = await params;
  return skillMetadata("marketing", skill);
}

export default async function Page({ params }: Props) {
  const { skill } = await params;
  return <SkillRoutePage categoryId="marketing" skillSlug={skill} />;
}
