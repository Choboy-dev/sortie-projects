import {
  SkillRoutePage,
  skillMetadata,
  skillStaticParams,
} from "@/components/skills/skill-route";

type Props = { params: Promise<{ skill: string }> };

export function generateStaticParams() {
  return skillStaticParams("product-managers");
}

export async function generateMetadata({ params }: Props) {
  const { skill } = await params;
  return skillMetadata("product-managers", skill);
}

export default async function Page({ params }: Props) {
  const { skill } = await params;
  return <SkillRoutePage categoryId="product-managers" skillSlug={skill} />;
}
