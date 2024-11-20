import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { useLocation } from "react-router-dom";
import Container from "./ui/common/Container";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CircleUser } from "lucide-react";

export default function Header() {
  const { pathname } = useLocation();

  const pathMap = {
    birth: "Naissance",
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-2 px-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <Container className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">App</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {pathMap[pathname.slice(1) as keyof typeof pathMap]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Container>
      <Avatar className="h-8 w-8 rounded-xl">
        <AvatarImage src={""} alt={"avatar-image"} />
        <AvatarFallback className="rounded-xxl">
          <CircleUser strokeWidth={1.5} />
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
