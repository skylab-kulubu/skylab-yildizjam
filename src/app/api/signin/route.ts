import { createSignInRoute } from "@skylab-kulubu/inscribed-auth/signin";

// Straight into Keycloak, on the site's own background while it redirects.
export const GET = createSignInRoute({ background: "#06040a", color: "#ffffff" });
