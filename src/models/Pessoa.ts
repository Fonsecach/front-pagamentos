import { Enderecos } from './Enderecos';
import { Contato } from './Contatos';

export interface Pessoa {
    id: number; 
    nome?: string; 
    nomeFantasia?: string; 
    numDocumento?: string; 
    tipo: TipoPessoa; 
    enderecos?: Enderecos[]; 
    contatos?: Contato[];
    criadoEm: Date; 
    atualizadoEm?: Date; 
    observacoes?: string; 
  }
  
  enum TipoPessoa {
    Fisica = "Fisica",
    Juridica = "Juridica"
  }
  