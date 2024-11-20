export const birthCertificateFieldMappings = {
  registryOffice: {
    sourceKey: "Conservatória",
    subFields: {
      municipality: {
        pattern: /(?:Civil|Predial|Comercial)\s*(.*)/,
        fallback: "full", // Use full source value if pattern doesn't match
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
      parser: "parseDateTime", // Reference to custom parser function
    },
    birthplace: {
      parish: {
        sourceKey: "Naturalidade",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*/,
        groupIndex: 1,
      },
      municipality: {
        sourceKey: "Naturalidade",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*$/,
        groupIndex: 1,
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
      groupIndex: 1,
    },
    status: {
      sourceKey: "Estado",
      cleanup: " ***",
    },
    birthplace: {
      parish: {
        sourceKey: "Naturalidade-Pai",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*/,
        groupIndex: 1,
      },
      municipality: {
        sourceKey: "Naturalidade-Pai",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*$/,
        groupIndex: 1,
      },
    },
    usualResidence: {
      place: {
        sourceKey: "Residência habitual",
        pattern: /(\w+[\wÀ-ÿ]*)\s*,/,
        groupIndex: 1,
      },
      parish: {
        sourceKey: "Residência habitual",
        pattern: /, (\w+[\wÀ-ÿ]*)\s*,/,
        groupIndex: 1,
      },
      municipality: {
        sourceKey: "Residência habitual",
        pattern: /, (\w+[\wÀ-ÿ]*) \*\*\*/,
        groupIndex: 1,
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
      groupIndex: 1,
    },
    status: {
      sourceKey: "Estado-Mãe",
      cleanup: " ***",
    },
    birthplace: {
      parish: {
        sourceKey: "Naturalidade-Mãe",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*/,
        groupIndex: 1,
      },
      municipality: {
        sourceKey: "Naturalidade-Mãe",
        pattern: /(\w+[\wÀ-ÿ]*) \*\*\*$/,
        groupIndex: 1,
      },
    },
    usualResidence: {
      place: {
        sourceKey: "Residência habitual-Mãe",
        pattern: /(\w+[\wÀ-ÿ]*)\s*,/,
        groupIndex: 1,
      },
      parish: {
        sourceKey: "Residência habitual-Mãe",
        pattern: /, (\w+[\wÀ-ÿ]*)\s*,/,
        groupIndex: 1,
      },
      municipality: {
        sourceKey: "Residência habitual-Mãe",
        pattern: /, (\w+[\wÀ-ÿ]*) \*\*\*/,
        groupIndex: 1,
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
      groupIndex: 0,
    },
    month: {
      sourceKey: "Data do assento",
      pattern: /de (\w+)/,
      groupIndex: 1,
    },
    year: {
      sourceKey: "Data do assento",
      pattern: /de (\d{4})/,
      groupIndex: 1,
    },
  },
  officer: {
    position: {
      sourceKey: "O/A",
      pattern: /(?<=O\/A\s)([^,]+)/,
      groupIndex: 1,
      transform: "trim",
    },
    name: {
      sourceKey: "O/A",
      pattern: /(?<=,)([^,]+)(?=,)/,
      groupIndex: 1,
      transform: "trim",
    },
    qualification: {
      sourceKey: "O/A",
      pattern: /(?<=,)([^,]+)$/,
      groupIndex: 1,
      transform: "trim",
    },
  },
  processNumber: {
    sourceKey: "Processo",
    pattern: /(\d+\/\s*\d+)$/,
    groupIndex: 0,
  },
} as const;
