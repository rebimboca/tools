export interface Banco {
  codigo: string;
  nome: string;
}

const BANCOS: ReadonlyArray<Banco> = [
  { codigo: "001", nome: "Banco do Brasil" },
  { codigo: "033", nome: "Santander" },
  { codigo: "104", nome: "Caixa Economica Federal" },
  { codigo: "237", nome: "Bradesco" },
  { codigo: "341", nome: "Itau Unibanco" }
];

export function consultarBancoPorNumero(codigo: string): Banco | null {
  const codigoNormalizado = codigo.trim().padStart(3, "0");
  return BANCOS.find((banco) => banco.codigo === codigoNormalizado) ?? null;
}

export function listarBancos(): ReadonlyArray<Banco> {
  return BANCOS;
}
