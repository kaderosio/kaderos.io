import { pages as part1Pages, rollen, branchen, type AITeamPage } from "./data";
import { part2Pages } from "./data-part2";

export const allPages: AITeamPage[] = [...part1Pages, ...part2Pages];

export { rollen, branchen };
export type { AITeamPage };

export function getPageBySlug(slug: string): AITeamPage | undefined {
  return allPages.find((p) => p.slug === slug);
}

export function getPagesByRolle(rolle: string): AITeamPage[] {
  return allPages.filter((p) => p.rolle === rolle);
}

export function getPagesByBranche(branche: string): AITeamPage[] {
  return allPages.filter((p) => p.branche === branche);
}

export function getAllSlugs(): string[] {
  return allPages.map((p) => p.slug);
}
