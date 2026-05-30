import { type CodigoCompe } from "../tipos";
import { normalizarCodigoCompe } from "../utilitarios";

export interface Banco {
  codigo: CodigoCompe;
  nome: string;
}

export interface BrasilApiBankResponse {
  code: string | number | null | undefined;
  fullName?: string;
  name?: string;
}

interface FetchComRetryOptions {
  timeoutMs?: number;
  retries?: number;
}

const FETCH_TIMEOUT_PADRAO_MS = 5000;
const FETCH_RETRIES_PADRAO = 2;

const limparTextoBusca = (valor: string): string =>
  valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

async function fetchComTimeoutERetry(
  url: string,
  options: FetchComRetryOptions = {}
): Promise<Response> {
  const timeoutMs = options.timeoutMs ?? FETCH_TIMEOUT_PADRAO_MS;
  const retries = options.retries ?? FETCH_RETRIES_PADRAO;

  let ultimoErro: unknown;
  for (let tentativa = 0; tentativa <= retries; tentativa += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      return response;
    } catch (erro) {
      ultimoErro = erro;
      if (tentativa === retries) break;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(`Falha ao consultar ${url}: ${String(ultimoErro)}`);
}

/**
 * Base de dados dos principais bancos brasileiros com código COMPE (3 dígitos).
 *
 * O código COMPE é atribuído pelo Banco Central do Brasil para identificar
 * cada instituição financeira no Sistema de Pagamentos Brasileiro (SPB).
 *
 * @see https://www.bcb.gov.br/estabilidadefinanceira/str
 */
export const bancos: ReadonlyArray<Banco> = [
  { codigo: "001", nome: "Banco do Brasil" },
  { codigo: "033", nome: "Santander" },
  { codigo: "077", nome: "Banco Inter" },
  { codigo: "104", nome: "Caixa Economica Federal" },
  { codigo: "197", nome: "Stone" },
  { codigo: "208", nome: "BTG Pactual" },
  { codigo: "212", nome: "Banco Original" },
  { codigo: "237", nome: "Bradesco" },
  { codigo: "260", nome: "Nubank" },
  { codigo: "290", nome: "PagBank (PagSeguro)" },
  { codigo: "302", nome: "Mercado Pago" },
  { codigo: "318", nome: "BMG" },
  { codigo: "336", nome: "C6 Bank" },
  { codigo: "341", nome: "Itau Unibanco" },
  { codigo: "348", nome: "XP Investments" },
  { codigo: "380", nome: "PicPay" },
  { codigo: "389", nome: "Banco Mercantil do Brasil" },
  { codigo: "422", nome: "Safra" },
  { codigo: "623", nome: "Pan" },
  { codigo: "655", nome: "Neon (Votorantim)" },
  { codigo: "745", nome: "Citibank" },
  { codigo: "748", nome: "Sicredi" },
  { codigo: "756", nome: "Sicoob" }
];

/**
 * Consulta um banco pelo código COMPE (3 dígitos).
 *
 * O código é normalizado (zero-padded) para 3 dígitos antes da consulta.
 *
 * @param codigo - Código COMPE do banco (ex: 1, "001", "341").
 * @param listaBancos - Lista de bancos opcional para busca (padrão: base estática).
 * @returns O banco encontrado ou `null` se não existir na base.
 *
 * @example
 * ```ts
 * const itau = bancoPorCodigo(341);
 * ```
 */
export function bancoPorCodigo(
  codigo: string | number,
  listaBancos: ReadonlyArray<Banco> = bancos
): Banco | null {
  const codigoNormalizado = normalizarCodigoCompe(codigo);
  if (!codigoNormalizado) return null;
  return listaBancos.find((banco) => banco.codigo === codigoNormalizado) ?? null;
}

/**
 * Consulta um banco pelo nome (busca case-insensitive).
 *
 * @param nome - Nome do banco (ex: "Itau", "bradesco", "NUBANK").
 * @param listaBancos - Lista de bancos opcional para busca (padrão: base estática).
 * @returns O banco encontrado ou `null` se não existir na base.
 *
 * @example
 * ```ts
 * const itau = bancoPorNome("Itau");
 * const nubank = bancoPorNome("nubank");
 * ```
 */
export function bancoPorNome(
  nome: string,
  listaBancos: ReadonlyArray<Banco> = bancos
): Banco | null {
  const termo = limparTextoBusca(nome);
  if (!termo) return null;
  return listaBancos.find((banco) => limparTextoBusca(banco.nome).includes(termo)) ?? null;
}

/**
 * Busca todos os bancos pelo nome (case-insensitive e sem acento).
 *
 * @param nome - Trecho do nome para busca.
 * @param listaBancos - Lista de bancos opcional para busca (padrão: base estática).
 * @returns Lista de bancos encontrados.
 */
export function bancosPorNome(nome: string, listaBancos: ReadonlyArray<Banco> = bancos): Banco[] {
  const termo = limparTextoBusca(nome);
  if (!termo) return [];
  return listaBancos.filter((banco) => limparTextoBusca(banco.nome).includes(termo));
}

/**
 * Busca a lista de bancos ativos em tempo real através da API pública da BrasilAPI.
 *
 * @returns Uma promessa que resolve em um array de bancos.
 * @throws {Error} Se a requisição falhar ou retornar uma resposta inválida.
 *
 * @see https://brasilapi.com.br/docs#tag/BANKS
 */
export async function bancosBrasilApi(): Promise<Banco[]> {
  const response = await fetchComTimeoutERetry("https://brasilapi.com.br/api/banks/v1");
  const data = (await response.json()) as unknown;
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("BrasilAPI retornou uma resposta vazia ou inválida.");
  }
  return (data as BrasilApiBankResponse[])
    .filter(
      (b): b is BrasilApiBankResponse & { code: string | number } =>
        b.code !== null && b.code !== undefined && String(b.code).trim() !== ""
    )
    .map((b) => {
      const codigo = normalizarCodigoCompe(String(b.code));
      if (!codigo) return null;
      return {
        codigo,
        nome: b.fullName || b.name || "Banco Sem Nome"
      };
    })
    .filter((b): b is Banco => b !== null);
}

/**
 * Busca a lista de bancos ativos em tempo real diretamente do arquivo oficial de participantes
 * do Sistema de Transferência de Reservas (STR) disponibilizado diariamente pelo Banco Central do Brasil.
 *
 * @returns Uma promessa que resolve em um array de bancos.
 * @throws {Error} Se a requisição falhar ou a parsing dos dados falhar.
 *
 * @see https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.csv
 */
export async function bancosBCB(): Promise<Banco[]> {
  const response = await fetchComTimeoutERetry(
    "https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.csv"
  );
  const text = await response.text();
  const lines = text.split(/\r?\n/);
  const parsedBancos: Banco[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;

    const csvFields: string[] = [];
    let currentField = "";
    let insideQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        csvFields.push(currentField.trim());
        currentField = "";
      } else {
        currentField += char;
      }
    }
    csvFields.push(currentField.trim());

    if (csvFields.length >= 6) {
      const compe = csvFields[2];
      const nome = csvFields[5] || csvFields[1] || "Banco Sem Nome";

      const codigo = compe ? normalizarCodigoCompe(compe) : null;
      if (codigo) {
        parsedBancos.push({
          codigo,
          nome: nome.replace(/^"|"$/g, "").trim()
        });
      }
    }
  }

  if (parsedBancos.length === 0) {
    throw new Error("Banco Central retornou uma lista de participantes vazia.");
  }
  return parsedBancos;
}
