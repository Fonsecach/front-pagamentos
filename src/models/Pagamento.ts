export interface Pagamento {
    id: number;
    valor: number;
    dataDePagamento: Date;
    pedidoId: number;
    devedorId: number;
    credorId: number;
  }
  