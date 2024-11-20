import * as React from "react";
import { FileDigit, FileOutput, Languages, Settings2 } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Jeanne SIMON",
    email: "jeanne.simon@entreprise.fr",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Traduction",
      url: "#",
      icon: Languages,
      isActive: true,
      items: [
        {
          title: "Traduction automatique",
          url: "/",
        },
        {
          title: "Traduction structurée",
          url: "/birth",
        },
        {
          title: "Historique",
          url: "#",
        },
      ],
    },
    {
      title: "Transcription",
      url: "#",
      icon: FileOutput,
      items: [
        {
          title: "Nouvelle transcription",
          url: "#",
        },
        {
          title: "Sauvegardées",
          url: "#",
        },
        {
          title: "Historique",
          url: "#",
        },
      ],
    },
    {
      title: "Conversion",
      url: "#",
      icon: FileDigit,
      items: [
        {
          title: "Image > PDF",
          url: "#",
        },
        {
          title: "Image > Document",
          url: "#",
        },
        {
          title: "PDF > Document",
          url: "#",
        },
        {
          title: "PDF > Document",
          url: "#",
        },
      ],
    },
    {
      title: "Préférences",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Générales",
          url: "#",
        },
        {
          title: "Langues et traduction",
          url: "#",
        },
        {
          title: "Transcription",
          url: "#",
        },
        {
          title: "Stockage et données",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({
  children,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
