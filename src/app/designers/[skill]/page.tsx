import {
  SkillRoutePage,
  skillMetadata,
  skillStaticParams,
} from "@/components/skills/skill-route";

type Props = { params: Promise<{ skill: string }> };

export function generateStaticParams() {
  return skillStaticParams("designers");
}

export async function generateMetadata({ params }: Props) {
  const { skill } = await params;
  return skillMetadata("designers", skill);
}

export default async function Page({ params }: Props) {
  const { skill } = await params;
  return <SkillRoutePage categoryId="designers" skillSlug={skill} />;
}
