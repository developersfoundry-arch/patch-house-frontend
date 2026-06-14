import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useThemeMode } from "@/components/theme-switcher";
import { InstallPrompt } from "@/components/install-prompt";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "StrandsAtHome — At-Home Hair Patch Service in Delhi NCR" },
      {
        name: "description",
        content:
          "StrandsAtHome — Non-surgical hair patch for men fitted privately at your home in Delhi, Noida, Gurugram, Ghaziabad, Faridabad & across NCR. Same-day fitting. No clinic. 100% confidential.",
      },
      {
        name: "keywords",
        content:
          "hair patch Delhi NCR, at home hair patch, non-surgical hair replacement Delhi, hair system home fitting, hair patch for men Delhi, baldness solution at home, hair patch Noida, hair patch Gurugram, hair patch Ghaziabad, hair patch Faridabad, hair replacement Delhi NCR, hair patch consultation home visit, non surgical hair replacement India, toupee fitting at home Delhi, hair patch service India, StrandsAtHome",
      },
      { name: "geo.region", content: "IN-DL" },
      { name: "geo.placename", content: "Delhi NCR, India" },
      { name: "geo.position", content: "28.6139;77.2090" },
      { name: "ICBM", content: "28.6139, 77.2090" },
      { property: "og:title", content: "StrandsAtHome — At-Home Hair Patch Service in Delhi NCR" },
      {
        property: "og:description",
        content:
          "A certified hair expert visits your home privately. Non-surgical hair patch fitted same-day across Delhi NCR. No clinic, no awkwardness.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "StrandsAtHome — At-Home Hair Patch Service" },
      {
        name: "twitter:description",
        content:
          "Private at-home hair patch fittings across Delhi NCR. Same-day service. No clinic visit needed.",
      },
      { name: "theme-color", content: "#18213a" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "StrandsAtHome" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('sah-mode');if(s==='light'){document.documentElement.setAttribute('data-mode','light');}else if(!s&&!window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-mode','light');}}catch(e){}})();` }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useThemeMode();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {/* PWA install prompt — not shown inside the authenticated dashboard */}
      {!pathname.startsWith("/dashboard") && <InstallPrompt />}
    </QueryClientProvider>
  );
}
