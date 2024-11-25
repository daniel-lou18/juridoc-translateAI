import * as z from "zod";

export const birthTemplateSchema = z.object({
  Conservatória: z.object({
    Concelho: z.string().nullable(),
    "Número do assento de nascimento": z.string().nullable(),
    "Ano do assento": z.string().nullable(),
  }),
  Registando: z.object({
    "Nome próprio": z.string().nullable(),
    Apelidos: z.string().nullable(),
    Sexo: z.string().nullable(),
    "Hora e data do nascimento": z.object({
      Horas: z.string().nullable(),
      Minutos: z.string().nullable(),
      Dia: z.string().nullable(),
      Mês: z.string().nullable(),
      Ano: z.string().nullable(),
    }),
    Naturalidade: z.object({
      Freguesia: z.string().nullable(),
      Concelho: z.string().nullable(),
    }),
  }),
  Pai: z.object({
    Nome: z.string().nullable(),
    Idade: z.string().nullable(),
    Estado: z.string().nullable(),
    Naturalidade: z.object({
      Freguesia: z.string().nullable(),
      Concelho: z.string().nullable(),
    }),
    "Residência habitual": z.object({
      Lugar: z.string().nullable(),
      Freguesia: z.string().nullable(),
      Concelho: z.string().nullable(),
    }),
  }),
  Mãe: z.object({
    Nome: z.string().nullable(),
    Idade: z.string().nullable(),
    Estado: z.string().nullable(),
    Naturalidade: z.object({
      Freguesia: z.string().nullable(),
      Concelho: z.string().nullable(),
    }),
    "Residência habitual": z.object({
      Lugar: z.string().nullable(),
      Freguesia: z.string().nullable(),
      Concelho: z.string().nullable(),
    }),
  }),
  "Avós paternos": z.string().nullable(),
  "Avós maternos": z.string().nullable(),
  "Declarante(s)": z.any().nullable(),
  "Menções especiais": z.any().nullable(),
  "Testemunha(s)": z.any().nullable(),
  "Data do assento": z.object({
    Dia: z.string().nullable(),
    Mês: z.string().nullable(),
    Ano: z.string().nullable(),
  }),
  "O/A": z.object({
    Funcionário: z.string().nullable(),
    Nome: z.string().nullable(),
    Qualificação: z.string().nullable(),
  }),
  Processo: z.string().nullable(),
  Averbamentos: z.any().nullable(),
});
