import { Amendment } from "../../../domain/birthCertificate/interfaces/BirthCertificate";
import translateService from "./translateService";

export interface ITranslateService {
  translateAnnotationLlm(text: string, template: string): Promise<string>;
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

        const nextLine = annotations[idx + 1];
        const annotationsTemplate = this.getTemplate(nextLine, annotationsMap);
        let result;

        if (annotationsTemplate) {
          result = await this.translateService.translateAnnotationLlm(
            nextLine,
            annotationsTemplate
          );
        } else {
          result = nextLine;
        }

        results[parseInt(number) - 1] = {
          number,
          description: result,
          date,
          responsible,
        };
      }
    }
    return results;
  }

  private getTemplate(textSegment: string, dictionary: Record<string, string>) {
    const annotationsTemplate = Object.entries(dictionary).filter(([key]) =>
      textSegment.includes(key)
    )?.[0]?.[1];

    return annotationsTemplate;
  }
}

export default new TranslateAnnotationsService(translateService);
