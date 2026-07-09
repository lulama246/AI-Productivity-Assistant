import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Footer } from "@/components/site-chrome";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-3 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="gradient-brand inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-md"
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
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again, or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="gradient-brand rounded-full px-5 py-2.5 text-sm font-semibold shadow-md"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-white/70 px-5 py-2.5 text-sm font-semibold text-foreground"
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
      { title: "Lulu's Helping Hands — Helping People. Changing Lives." },
      {
        name: "description",
        content:
          "An AI-powered platform connecting people who need help with resources, volunteers, and organizations that care.",
      },
      { property: "og:title", content: "Lulu's Helping Hands — Helping People. Changing Lives." },
      {
        property: "og:description",
        content:
          "An AI-powered platform connecting people who need help with resources, volunteers, and organizations that care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lulu's Helping Hands — Helping People. Changing Lives." },
      { name: "twitter:description", content: "An AI-powered platform connecting people who need help with resources, volunteers, and organizations that care." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84693bfd-072f-4e81-a719-a2ee27c7c00d/id-preview-8530ed2b--1f3327f6-c49d-46f3-b1a0-24366060def0.lovable.app-1783511947475.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84693bfd-072f-4e81-a719-a2ee27c7c00d/id-preview-8530ed2b--1f3327f6-c49d-46f3-b1a0-24366060def0.lovable.app-1783511947475.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
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

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-12 items-center gap-2 px-4">
              <div className="glass flex h-10 items-center gap-2 rounded-full px-3">
                <SidebarTrigger />
                <span className="text-xs font-medium text-muted-foreground">Menu</span>
              </div>
            </header>
            <main className="min-h-[60vh] flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </SidebarProvider>
      <Toaster richColors position="top-center" />
    </QueryClientProvider>

  );
}
