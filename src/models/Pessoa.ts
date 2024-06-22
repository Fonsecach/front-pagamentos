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
  
  export enum TipoPessoa {
    Fisica = "Fisica",
    Juridica = "Juridica"
  }
  
  export interface Enderecos {
    id: number; 
    logradouro?: string; 
    numero?: string;   
    complemento?: string; 
    bairro?: string;     
    cidade?: string;     
    estado?: string;     
    cep?: string;        
    pessoaId: number;   
  }

  export interface Contato {
    id: number; 
    email?: string;  
    whatsapp?: string; 
    telefone?: string; 
    pessoaId: number; 
  }
  