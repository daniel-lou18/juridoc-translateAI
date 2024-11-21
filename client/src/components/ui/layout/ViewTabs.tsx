import HtmlCardPages from "@/components/file/HtmlHandler/HtmlCardPages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ViewTabsProps = {
  tabsData: { triggerValue: string; component: ReactNode | null }[];
  isTranslated: boolean;
};

export default function ViewTabs({ tabsData, isTranslated }: ViewTabsProps) {
  if (!isTranslated) {
    return <HtmlCardPages />;
  }

  return (
    <Tabs defaultValue={tabsData?.[0].triggerValue} className="w-full">
      {createPortal(
        <TabsList>
          {tabsData.map(({ triggerValue }) => (
            <TabsTrigger
              key={triggerValue}
              value={triggerValue}
              className="capitalize"
            >
              {triggerValue}
            </TabsTrigger>
          ))}
          <TabsTrigger value="all">Tout</TabsTrigger>
        </TabsList>,
        document.getElementById("tabs-portal") || document.body
      )}
      {tabsData.map(({ triggerValue, component }) => (
        <TabsContent key={triggerValue} value={triggerValue}>
          {component}
        </TabsContent>
      ))}
      <TabsContent value="all">
        {tabsData.map(({ component }) => component)}
      </TabsContent>
    </Tabs>
  );
}
