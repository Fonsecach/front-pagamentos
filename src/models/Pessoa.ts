export interface Pessoa {
    id?: number | null; 
    nome?: string; 
    nomeFantasia?: string; 
    numDocumento?: string; 
    tipo: string; 
    enderecos?: Enderecos[] | null;
    contatos?: Contato[] | null;
    criadoEm: Date | string;
    atualizadoEm?: Date | string;
    observacoes?: string; 
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
  