export const birthCertificateFieldMappings = {
  registryOffice: {
    municipality: {
      sourceKey: "Conservatória",
      pattern: /(?:Civil|Predial|Comercial)\s*(.*)/,
    },
    birthRecordNumber: {
      sourceKey: "Assento",
      pattern: /\d+/,
    },
    birthRecordYear: {
      sourceKey: "Assento",
      pattern: /\d{4}\b(?!.*\d)/,
    },
  },
  registrant: {
    firstName: {
      sourceKey: "Nome próprio",
      cleanup: " ***",
    },
    surname: {
      sourceKey: "Apelidos",
      cleanup: " ***",
    },
    gender: {
      sourceKey: "Sexo",
      cleanup: " ***",
    },
    birthTimeAndDate: {
      sourceKey: "Hora e data do nascimento",
      cleanup: " ***", // Will be parsed in a second step with a custom parser function
    },
    birthplace: {
      parish: {
        sourceKey: "Naturalidade",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*/,
      },
      municipality: {
        sourceKey: "Naturalidade",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*$/,
      },
    },
  },
  father: {
    name: {
      sourceKey: "Nome",
      cleanup: " ***",
    },
    age: {
      sourceKey: "Idade",
      pattern: /(\d+)/,
    },
    status: {
      sourceKey: "Estado",
      cleanup: " ***",
    },
    birthplace: {
      parish: {
        sourceKey: "Naturalidade-Pai",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*/,
      },
      municipality: {
        sourceKey: "Naturalidade-Pai",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*$/,
      },
    },
    usualResidence: {
      place: {
        sourceKey: "Residência habitual",
        pattern: /(\w+[\wÀ-ÿ]*)\s*,/,
      },
      parish: {
        sourceKey: "Residência habitual",
        pattern: /, (\w+[\wÀ-ÿ]*)\s*,/,
      },
      municipality: {
        sourceKey: "Residência habitual",
        pattern: /, (\w+[\wÀ-ÿ]*) \*\*\*/,
      },
    },
  },
  mother: {
    name: {
      sourceKey: "Nome-Mãe",
      cleanup: " ***",
    },
    age: {
      sourceKey: "Idade-Mãe",
      pattern: /(\d+)/,
    },
    status: {
      sourceKey: "Estado-Mãe",
      cleanup: " ***",
    },
    birthplace: {
      parish: {
        sourceKey: "Naturalidade-Mãe",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*/,
      },
      municipality: {
        sourceKey: "Naturalidade-Mãe",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*$/,
      },
    },
    usualResidence: {
      place: {
        sourceKey: "Residência habitual-Mãe",
        pattern: /(\w+[\wÀ-ÿ]*)\s*,/,
      },
      parish: {
        sourceKey: "Residência habitual-Mãe",
        pattern: /, (\w+[\wÀ-ÿ]*)\s*,/,
      },
      municipality: {
        sourceKey: "Residência habitual-Mãe",
        pattern: /, (\w+[\wÀ-ÿ]*) \*\*\*/,
      },
    },
  },
  paternalGrandparents: {
    sourceKey: "Avós paternos",
    cleanup: " ***",
  },
  maternalGrandparents: {
    sourceKey: "Avós maternos",
    cleanup: " ***",
  },
  declarant: {
    sourceKey: "Declarante(s)",
    cleanup: " ***",
  },
  specialMentions: {
    sourceKey: "MençÁµes especiais",
    cleanup: " ***",
  },
  witnesses: {
    sourceKey: "Testemunha(s)",
    cleanup: " ***",
  },
  birthRecordDate: {
    day: {
      sourceKey: "Data do assento",
      pattern: /(\d{2})/,
    },
    month: {
      sourceKey: "Data do assento",
      pattern: /de (\w+)/,
    },
    year: {
      sourceKey: "Data do assento",
      pattern: /de (\d{4})/,
    },
  },
  officer: {
    position: {
      sourceKey: "O/A",
      pattern: /(?<=O\/A\s)([^,]+)/,
    },
    name: {
      sourceKey: "O/A",
      pattern: /(?<=,)([^,]+)(?=,)/,
    },
    qualification: {
      sourceKey: "O/A",
      pattern: /(?<=,)([^,]+)$/,
    },
  },
  processNumber: {
    sourceKey: "Processo",
    pattern: /(\d+\/\s*\d+)$/,
  },
};
