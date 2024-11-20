type StringOrNull = string | null;

export interface Conservatoria {
  Concelho: StringOrNull;
  "Número do assento de nascimento": StringOrNull;
  "Ano do assento": StringOrNull;
}

export interface Naturalidade {
  Freguesia: StringOrNull;
  Concelho: StringOrNull;
}

export interface ResidenciaHabitual {
  Lugar: StringOrNull;
  Freguesia: StringOrNull;
  Concelho: StringOrNull;
}

export interface HoraDato {
  Horas: StringOrNull;
  Minutos: StringOrNull;
  Dia: StringOrNull;
  Mês: StringOrNull;
  Ano: StringOrNull;
}

export interface Pessoa {
  Nome: StringOrNull;
  Idade: StringOrNull;
  Estado: StringOrNull;
  Naturalidade: Naturalidade;
  "Residência habitual": ResidenciaHabitual;
}

export interface Registando {
  "Nome próprio": StringOrNull;
  Apelidos: StringOrNull;
  Sexo: StringOrNull;
  "Hora e data do nascimento": HoraDato;
  Naturalidade: Naturalidade;
}

export interface Averbamento {
  Número: number | null;
  Data: StringOrNull;
  Descrição: StringOrNull;
  Responsável: StringOrNull;
}

export interface BirthCertificate {
  Conservatória: Conservatoria;
  Registando: Registando;
  Pai: Pessoa;
  Mãe: Pessoa;
  "Avós paternos": string[] | null;
  "Avós maternos": string[] | null;
  "Declarante(s)": StringOrNull;
  "Menções especiais": StringOrNull;
  "Testemunha(s)": StringOrNull;
  "Data do assento": StringOrNull;
  "O/A": StringOrNull;
  Processo: StringOrNull;
  Averbamentos: Averbamento[] | null;
}

export type HtmlContent = [Element, Element];
