import { NextResponse, type NextRequest } from "next/server";
import { isSandbox } from "@/lib/search-index";

// Search engines get the same answer from the headers as from the page: nothing at all
// from the sandbox, and on the live site the pages but not the site's own images.
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (isSandbox()) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  else if (request.nextUrl.pathname.startsWith("/img/")) response.headers.set("X-Robots-Tag", "noindex");
  return response;
}

export const config = { matcher: ["/((?!_next/).*)"] };
