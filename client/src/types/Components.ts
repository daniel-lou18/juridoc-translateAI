export type TextContentProps<T> = {
  data: T;
  isLoading: boolean;
  error: string;
};

export type ContainerElement = "div" | "section" | "article" | "main";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type Field = {
  label: string | null;
  value: string;
  id: string;
};

export type BirthCertificateSection = {
  title: string | null;
  fields: Field[];
};
