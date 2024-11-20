import { AppSidebar } from "@/components/app-sidebar";
import MainLayout from "@/components/ui/layout/MainLayout";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <AppSidebar>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </AppSidebar>
  );
}
