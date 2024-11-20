import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type ViewOptions = "miniature" | "side-by-side" | "toggle";

type ContextValue = {
  viewMode: ViewOptions;
  setViewMode: Dispatch<SetStateAction<ViewOptions>>;
};

const ViewContext = createContext<ContextValue | null>(null);

export default function ViewContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [viewMode, setViewMode] = useState<ViewOptions>("toggle");

  return (
    <ViewContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useViewContext() {
  const context = useContext(ViewContext);

  if (!context) {
    throw new Error("useViewContext has to be used within ViewContextProvider");
  }

  return context;
}
