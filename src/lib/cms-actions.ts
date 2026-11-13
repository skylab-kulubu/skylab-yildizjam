"use server";

import { getServerSession } from "next-auth";
import { updateTag } from "next/cache";
import { authOptions } from "./auth";

/**
 * Runs after an editor saves. inscribed's own revalidateCmsSlug marks the content stale with
 * the "max" profile, so the page served right after a save is still the old one; updateTag
 * expires it at once, and a tag cleared inside a server action makes Next render the page
 * again in the same response, so the editor sees the change without reloading.
 */
export async function refreshCmsContent(slug: string, locale?: string) {
  // Only a signed-in editor saves, so only they may empty the cache
  if (!(await getServerSession(authOptions))) return;
  updateTag(locale ? `cms-${locale}-${slug}` : `cms-${slug}`);
  updateTag(locale ? `cms-site-${locale}` : "cms-site");
}
