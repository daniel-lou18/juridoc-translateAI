import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "../assets/color.png";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <a href="#">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
              <img
                src={logo}
                alt="logo"
                className="h-full aspect-square object-cover object-bottom"
              />{" "}
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">JuriDoc Translate AI</span>
              <span className="">v0.0.1</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
