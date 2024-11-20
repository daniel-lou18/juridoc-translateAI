import { ComponentType, PropsWithChildren } from "react";

type LoaderWrapperProps = PropsWithChildren<{
  isData: boolean;
  isLoading: boolean;
  LoadingIndicator: ComponentType;
  error: string | null;
}>;

export default function LoaderWrapper({
  children,
  isData,
  isLoading,
  LoadingIndicator,
  error,
}: LoaderWrapperProps) {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!isData) {
    return null;
  }

  return <>{children}</>;
}
