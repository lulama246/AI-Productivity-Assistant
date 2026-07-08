import { Link, useRouterState } from "@tanstack/react-router";
import {
  Heart,
  Home,
  Info,
  Sparkles,
  Users,
  HandCoins,
  HandHeart,
  FolderHeart,
  Mail,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "About", url: "/about", icon: Info },
  { title: "Services", url: "/services", icon: HandHeart },
  { title: "AI Tools", url: "/ai-assistant", icon: Sparkles },
  { title: "Volunteer", url: "/volunteers", icon: Users },
  { title: "Donate", url: "/donate", icon: HandCoins },
  { title: "Projects", url: "/community-projects", icon: FolderHeart },
  { title: "Contact", url: "/contact", icon: Mail },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({
    select: (r) => r.location.pathname,
  });
  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-white/40">
        <Link to="/" className="flex items-center gap-2.5 px-2 py-2">
          <span className="gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl shadow-lg">
            <Heart className="h-4.5 w-4.5" fill="currentColor" />
          </span>
          {!collapsed && (
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold gradient-text">
                Lulu's Helping Hands
              </span>
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                Changing Lives
              </span>
            </span>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/40">
        {!collapsed && (
          <Link
            to="/donate"
            className="gradient-brand mx-1 mb-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-md transition hover:opacity-95"
          >
            <HandCoins className="h-3.5 w-3.5" /> Donate
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
