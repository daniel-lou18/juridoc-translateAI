export const birthDocTemplate = `
  Conservatória do Registo Civil Braga
  Assento de Nascimento n.º 11815 do ano de 2013

  Registando
  Nome próprio Baltazar ***
  Apelidos: da Silva Costa ***
  Sexo: Masculino ***
  Hora e data do
  nascimento: 16 horas e OO minutos, do dia 09 de Janeiro de 1938 ***
  Naturalidade: freguesia de Adaúfe ***
  concelho de Braga ***

  Pai
  Nome: António da Costa ***
  Idade: 37 anos ***
  Estado: Casado(a) ***
  Naturalidade: freguesia de Adaúfe ***
  concelho de Braga ***
  Residência habitual: Lugar do Outeiro, freguesia de Adaúfe, concelho de Braga ***

  Mãe
  Nome: Maria da Silva ***
  Idade: 37 anos ***
  Estado: Casado(a) ***
  Naturalidade: freguesia de Adaúfe ***
  concelho de Braga ***
  Residência habitual: Lugar do Outeiro, freguesia de Adaúfe, concelho de Braga ***

  Avós paternos: Manuel Francisco da Costa e Maria Fernandes ***
  Avós maternos: José da Silva e Maria da Silva ***

  Dedarante(s): ***
  Menções especiais: ***
  Testemunha(s): ***
  Data do assento: 01 de Outubro de 2013 ***

  O/A 2º Ajudante, Maria de Fátima Esteves Vieites, Por competência própria
  Processo n.º 16633/ 2013

  Assento de Nascimento 11815/2013, Conservatória do Registo Civil Braga

  Averbamento nº. 1, de 2013-10-01
  Casou catolicamente com Maria Rosa Pereira de Brito em 5 de setembro de 1964, na freguesia de Adaúfe,
  concelho de Braga. Assento n-º 446 de 1964. Em 8 de setembro de 1964.
  2º Ajudante(a) Maria de Fátima Esteves Vieites, Conservatória do Registo Civil de Braga
  Cota : Informatização do assento nº 175/1938, lavrado em 03/02/1938 na Conservatória do Registo Civil de
  Braga. - 2013-10-01

  Averbamento nº. 2, de 2014-01-24
  O casamento averbado sob o nº 1, foi dissolvido por óbito do cônjuge Maria Rosa Pereira de Brito, em 23 de
  Janeiro de 2014. Assento de Óbito nº 88 de 2014 da Conservatória do Registo Civil de Braga.
  2º Ajudante(a) Maria do Céu Gonçalves Guimarães Gomes, Conservatória do Registo Civil de Braga

  Averbamento nº. 3, de 2021-12-27
  Faleceu em 25 de dezembro de 2021, na freguesia de Braga (São Vítor), concelho de Braga. Assento de óbito
  nº 216 de 2021 da Conservatória de Amares.
  Oficial de registos(a) Joana Célia Oliveira Cunha, Conservatória do Registo Civil/Predial/Comercial Amares
`;

const birthTemplateAvarbamentos = [
  {
    Numero: 1,
    Data: "2013-10-01",
    Tipo: "casamento",
    Detalhes: {
      TipoCasamento: "católico",
      DataEvento: "1964-09-05",
      DataRegisto: "1964-09-08",
      Conjuge: "Maria Rosa Pereira de Brito",
      Freguesia: "Adaúfe",
      Concelho: "Braga",
      NumeroAssento: "446/1964",
    },
    Funcionario: {
      Nome: "Maria de Fátima Esteves Vieites",
      Cargo: "2º Ajudante",
      Conservatoria: "Conservatória do Registo Civil de Braga",
    },
  },
  {
    Numero: 2,
    Data: "2014-01-24",
    Tipo: "dissolucao_casamento",
    Detalhes: {
      Causa: "óbito",
      ConjugeFalecido: "Maria Rosa Pereira de Brito",
      DataObito: "2014-01-23",
      AssentoObito: {
        Numero: "88/2014",
        Conservatoria: "Conservatória do Registo Civil de Braga",
      },
    },
    Funcionario: {
      Nome: "Maria do Céu Gonçalves Guimarães Gomes",
      Cargo: "2º Ajudante",
      Conservatoria: "Conservatória do Registo Civil de Braga",
    },
  },
  {
    Numero: 3,
    Data: "2021-12-27",
    Tipo: "obito",
    Detalhes: {
      DataObito: "2021-12-25",
      Local: {
        Freguesia: "Braga (São Vítor)",
        Concelho: "Braga",
      },
      AssentoObito: {
        Numero: "216/2021",
        Conservatoria: "Conservatória de Amares",
      },
    },
    Funcionario: {
      Nome: "Joana Célia Oliveira Cunha",
      Cargo: "Oficial de registos",
      Conservatoria: "Conservatória do Registo Civil/Predial/Comercial Amares",
    },
  },
];

export const birthTemplate = {
  Conservatória: {
    Concelho: "Braga",
    "Número do assento de nascimento": "11815",
    "Ano do assento": "2013",
  },
  Registando: {
    "Nome próprio": "Baltazar",
    Apelidos: "da Silva Costa",
    Sexo: "Masculino",
    "Hora e data do nascimento": {
      Horas: "16",
      Minutos: "00",
      Dia: "09",
      Mês: "Janeiro",
      Ano: "1938",
    },
    Naturalidade: {
      Freguesia: "Adaúfe",
      Concelho: "Braga",
    },
  },
  Pai: {
    Nome: "António da Costa",
    Idade: "37",
    Estado: "Casado(a)",
    Naturalidade: {
      Freguesia: "Adaúfe",
      Concelho: "Braga",
    },
    "Residência habitual": {
      Lugar: "Outeiro",
      Freguesia: "Adaúfe",
      Concelho: "Braga",
    },
  },
  Mãe: {
    Nome: "Maria da Silva",
    Idade: "37",
    Estado: "Casado(a)",
    Naturalidade: {
      Freguesia: "Adaúfe",
      Concelho: "Braga",
    },
    "Residência habitual": {
      Lugar: "Outeiro",
      Freguesia: "Adaúfe",
      Concelho: "Braga",
    },
  },
  "Avós paternos": "Manuel Francisco da Costa e Maria Fernandes",
  "Avós maternos": "José da Silva e Maria da Silva",
  "Declarante(s)": null,
  "Menções especiais": null,
  "Testemunha(s)": null,
  "Data do assento": {
    Dia: "01",
    Mês: "Outubro",
    Ano: "2013",
  },
  "O/A": {
    Funcionário: "2º Ajudante",
    Nome: "Maria de Fátima Esteves Vieites",
    Qualificação: "Por competência própria",
  },
  Processo: "16633/2013",
  Averbamentos: birthTemplateAvarbamentos,
};

const birthTemplateKeyMap = {
  Conservatória: "registryOffice",
  Concelho: "municipality",
  "Número do assento de nascimento": "birthRecordNumber",
  "Ano do assento": "birthRecordYear",
  Registando: "registrant",
  "Nome próprio": "firstName",
  Apelidos: "surname",
  Sexo: "gender",
  "Hora e data do nascimento": "birthTimeAndDate",
  Horas: "hours",
  Minutos: "minutes",
  Dia: "day",
  Mês: "month",
  Ano: "year",
  Naturalidade: "birthplace",
  Freguesia: "parish",
  Pai: "father",
  Nome: "name",
  Idade: "age",
  Estado: "status",
  "Residência habitual": "usualResidence",
  Lugar: "place",
  Mãe: "mother",
  "Avós paternos": "paternalGrandparents",
  Avô: "grandfather",
  Avó: "grandmother",
  "Avós maternos": "maternalGrandparents",
  "Declarante(s)": "declarant",
  "Menções especiais": "specialMentions",
  "Testemunha(s)": "witnesses",
  "Data do assento": "birthRecordDate",
  "O/A": "officer",
  Funcionário: "position",
  Qualificação: "qualification",
  Processo: "process",
  Averbamentos: "annotations",
};

export const annotationsMap = {
  Casou: `Mariage catholique avec Libório Rodrigues Cerqueira, le 29 mars 1967, au village d’Espinho, commune de Braga. Acte n°69/67 du Bureau de Monção. Le 31 mars 1697.`,
  "Alterou o nome": `Modification du nom par Esperança Fernandes Alves Cerqueria, par effet du mariage qui se réfère à la mention n°1 Doc. N°22, mai 5-C.Année 2005. Le 2/3/05.`,
  "dissolvido por óbito": `Le mariage inscrit sous nº 1 a été dissous par le décès de l’épouse Maria Rosa Pereira de Brito, le 23 janvier 2014. Acte de décès nº 88 de 2014 du Bureau du Registre Civil de Braga.`,
  Faleceu: `Décédé le 25 décembre 2021, dans la paroisse de Braga (São Vítor), municipalité de Braga. Acte de décès nº 216 de 2021 du Bureau d'Amares.`,
};

export function convertKeys(source: object, keyMap: Record<string, string>) {
  if (typeof source === "string" || source === null) {
    return source;
  }

  return Object.entries(source).reduce((acc, [key, value]) => {
    const newKey = keyMap[key] || key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      acc[newKey] = convertKeys(value, keyMap);
    } else {
      acc[newKey] = value === null ? "" : value;
    }

    return acc;
  }, {} as Record<string, string | null | object>);
}

export function translateKeys(source: object) {
  return convertKeys(source, birthTemplateKeyMap);
}
