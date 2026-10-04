import KeycloakProvider from "next-auth/providers/keycloak";
import { createCmsAuthOptions } from "@skylab-kulubu/inscribed-auth/server";

// The Keycloak provider is created here rather than inside the adapter package, where
// it would be bundled through a dependency and resolve to undefined at runtime.
export const authOptions = createCmsAuthOptions({
  provider: KeycloakProvider({
    clientId: process.env.KEYCLOAK_CLIENT_ID ?? "",
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
    issuer: process.env.KEYCLOAK_ISSUER ?? "",
  }),
});
