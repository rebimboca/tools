import { CATEGORIAS } from "../dados/categorias";
import { MARCAS } from "../dados/marcas";
import { MODELOS } from "../dados/modelos";
import { gerarPlacaVeiculo } from "./placa-veiculo";
import { gerarRENAVAM } from "./renavam";

export interface VeiculoGerado {
  marca: string;
  modelo: string;
  categoria: string;
  ano: number;
  placa: string;
  renavam: string;
  cor: string;
}

const CORES = ["Preto", "Branco", "Prata", "Cinza", "Azul", "Vermelho"];

export function gerarVeiculo(): VeiculoGerado {
  const marca = MARCAS[Math.floor(Math.random() * MARCAS.length)] ?? "Generica";
  const modelos = MODELOS[marca] ?? ["Modelo"];
  return {
    marca,
    modelo: modelos[Math.floor(Math.random() * modelos.length)] ?? "Modelo",
    categoria: CATEGORIAS[Math.floor(Math.random() * CATEGORIAS.length)] ?? "Sedan",
    ano: 2000 + Math.floor(Math.random() * 27),
    placa: gerarPlacaVeiculo({ comPontuacao: true }),
    renavam: gerarRENAVAM(),
    cor: CORES[Math.floor(Math.random() * CORES.length)] ?? "Preto"
  };
}
