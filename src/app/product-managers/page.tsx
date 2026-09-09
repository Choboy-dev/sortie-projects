import type { Metadata } from "next";
import {
  CategoryRoutePage,
  categoryMetadata,
} from "@/components/skills/skill-route";

export async function generateMetadata(): Promise<Metadata> {
  return categoryMetadata("product-managers");
}

export default function Page() {
  return <CategoryRoutePage categoryId="product-managers" />;
}
