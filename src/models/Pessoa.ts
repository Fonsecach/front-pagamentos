export interface Pessoa{
    id?: number;
    nome: string;
    numDocumento: string;
    tipo: TipoPessoa;
    enderecos: Endereco[];
    contatos: Contato[];
    criadoEm: Date;
}
export enum TipoPessoa {
    Fisica = 1,
    Juridica = 2,
  }

export interface Endereco {
    id: number;
    logradouro: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    cep: string | null;
    pessoaId: number;
}
export interface Contato {
    id: number;
    email: string | null;
    whatsapp: string | null;
    telefone: string | null;
    observacoes: string | null;
    pessoaId: number;
  }
  
  