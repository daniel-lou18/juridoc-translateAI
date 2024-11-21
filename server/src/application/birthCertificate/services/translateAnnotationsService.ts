import { Amendment } from "../../../domain/birthCertificate/interfaces/BirthCertificate";
import translateService from "./translateService";

export interface ITranslateService {
  translateAnnotationLlm(
    text: string,
    annotationsMap: Record<string, string>,
    idx: number
  ): Promise<string>;
}

type CreateAnnotations = (
  annotations: string[],
  idx: number
) => {
  description: RegExpMatchArray;
  responsible: {
    person: string;
    office: string;
  };
};

class TranslateAnnotationsService {
  constructor(private translateService: ITranslateService) {}

  async translateAnnotations(
    annotations: string[],
    annotationsMap: Record<string, string>,
    createAnnotations: CreateAnnotations
  ) {
    const results: Amendment[] = [];

    for (let idx = 0; idx < annotations.length; idx++) {
      const text = annotations[idx];

      if (text.includes("Averbamento")) {
        const {
          description: [, number, date],
          responsible,
        } = createAnnotations(annotations, idx);

        const result = await this.translateService.translateAnnotationLlm(
          annotations[idx + 1],
          annotationsMap,
          idx
        );

        results[parseInt(number) - 1] = {
          number,
          description: result || "",
          date,
          responsible,
        };
      }
    }

    return results;
  }
}

export default new TranslateAnnotationsService(translateService);
