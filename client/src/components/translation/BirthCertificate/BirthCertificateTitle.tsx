import { CardTitle } from "@/components/ui/card";
import { ViewOptions } from "@/contexts/viewContext";
import { RegistryOffice } from "@/utils/translation";

type BirthCertificateTitleProps = {
  currentPageIdx: number;
  data: RegistryOffice;
  viewMode: ViewOptions;
};

export default function BirthCertificateTitle({
  currentPageIdx,
  data,
  viewMode,
}: BirthCertificateTitleProps) {
  const { municipality, birthRecordNumber, birthRecordYear } = data;

  const titleContent = [
    <>
      <CardTitle
        className={`text-center font-bold mt-4 ${
          viewMode !== "toggle" ? "text-sm" : "text-2xl"
        }`}
      >
        {`Bureau du Registre Civil de ${municipality}`}
      </CardTitle>
      <CardTitle
        className={`text-center text-xl ${
          viewMode !== "toggle" ? "text-sm" : "text-xl"
        }`}
      >
        Acte de Naissance n° {birthRecordNumber} de l'année {birthRecordYear}
      </CardTitle>
    </>,
    <>
      <CardTitle
        className={`font-bold mt-4 px-4 ${
          viewMode !== "toggle" ? "text-xs" : "text-sm"
        }`}
      >
        {`Acte de Naissance ${birthRecordNumber}/${birthRecordYear}, Bureau du Registre Civil/des Biens/Commercial de ${municipality}`}
      </CardTitle>
    </>,
  ];

  return <>{titleContent[currentPageIdx]}</>;
}
