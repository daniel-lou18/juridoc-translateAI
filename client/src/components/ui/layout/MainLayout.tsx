import { ReactNode } from "react";
import Header from "../../Header";
import Container from "../../ui/common/Container";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="w-full h-full min-h-screen mx-auto space-y-4 bg-stone-50">
      <Header />
      {children}
    </Container>
  );
}
