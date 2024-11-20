import { createContext, PropsWithChildren, ReactNode, useContext } from "react";

export type TextCardProps = {
  result: string;
  error: string;
};

type CardHeaderProps = PropsWithChildren & { icon: ReactNode };

const TextCardContext = createContext<TextCardProps>(null!);

function useTextCard() {
  const context = useContext(TextCardContext);
  if (!context) {
    throw new Error(
      "Composant de type Compound Component doit être utilisé à l'intérieur de TextCard"
    );
  }
  return context;
}

function TextCard({
  children,
  result,
  error,
}: TextCardProps & PropsWithChildren) {
  return (
    <TextCardContext.Provider value={{ result, error }}>
      <div className="flex-1">{children}</div>
    </TextCardContext.Provider>
  );
}

function CardHeader({ children, icon }: CardHeaderProps) {
  return (
    <h4 className="text-xl font-semibold flex items-center">
      {icon} {children}
    </h4>
  );
}

function CardBody() {
  const { result, error } = useTextCard();

  return (
    <div className="bg-stone-100 rounded-md p-4 mt-4">
      <pre className="whitespace-pre-wrap">{result}</pre>
      <div>{error}</div>
    </div>
  );
}

TextCard.Header = CardHeader;
TextCard.Body = CardBody;

export default TextCard;
