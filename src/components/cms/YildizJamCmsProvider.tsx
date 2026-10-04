"use client";

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { CmsProvider } from "inscribed";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ComponentProps,
} from "react";
import type { Session } from "next-auth";

type CmsProps = ComponentProps<typeof CmsProvider>;
type ArtlabSession = Session & { accessToken?: string; error?: string };

// An editor can put the editing panel and the page's edit marks away and look at the
// site as visitors do, while staying signed in. Kept per browser.
const HIDDEN_KEY = "cms-panel-gizli";
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readHidden() {
  try {
    return localStorage.getItem(HIDDEN_KEY) === "1";
  } catch {
    return false;
  }
}

function writeHidden(hidden: boolean) {
  try {
    if (hidden) localStorage.setItem(HIDDEN_KEY, "1");
    else localStorage.removeItem(HIDDEN_KEY);
  } catch {
    // Storage blocked: the switch still works for this page view.
  }
  listeners.forEach((onChange) => onChange());
}

type PanelSwitch = { canEdit: boolean; hidden: boolean; setHidden: (hidden: boolean) => void };

const PanelSwitchContext = createContext<PanelSwitch>({ canEdit: false, hidden: false, setHidden: () => {} });

/** Whether the signed-in user may edit, and the switch that shows or hides the editing panel. */
export function useCmsPanelSwitch() {
  return useContext(PanelSwitchContext);
}

// The adapter package's NextAuthCmsProvider forwards only the props it names and
// drops the ones inscribed 5 adds, so this wrapper forwards everything it is given.
function Inner({ isAdmin, children, ...props }: CmsProps) {
  const session = useSession().data as ArtlabSession | null;

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") signIn("keycloak");
  }, [session?.error]);

  // Always handed over, so inscribed never starts its own browser sign-in flow.
  const getAccessToken = useCallback(async () => session?.accessToken ?? "", [session?.accessToken]);

  const user = session?.user;
  const userInfo = useMemo(
    () => (user ? { name: user.name ?? null, email: user.email ?? null, image: user.image ?? null } : null),
    [user],
  );
  const onSignOut = useCallback(() => signOut({ callbackUrl: "/" }), []);

  const hidden = useSyncExternalStore(subscribe, readHidden, () => false);
  const panelSwitch = useMemo(() => ({ canEdit: Boolean(isAdmin), hidden, setHidden: writeHidden }), [isAdmin, hidden]);

  return (
    <PanelSwitchContext.Provider value={panelSwitch}>
      <CmsProvider
        {...props}
        isAdmin={Boolean(isAdmin) && !hidden}
        getAccessToken={getAccessToken}
        userInfo={userInfo}
        onSignOut={onSignOut}
      >
        {children}
      </CmsProvider>
    </PanelSwitchContext.Provider>
  );
}

export function YildizJamCmsProvider({ session, ...props }: CmsProps & { session?: Session | null }) {
  return (
    <SessionProvider session={session}>
      <Inner {...props} />
    </SessionProvider>
  );
}
