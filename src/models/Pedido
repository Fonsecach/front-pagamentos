export interface Pedido {
    id: number;
    valorTotal: number | null;
    nome: string | null;
    descricao: string | null;
    dataDoPedido: Date;
    dataDoVencimento: Date;
    status: StatusPedido; 
    devedorId: number;
    credorId: number;
  }
  
  enum StatusPedido {
    AguardandoPagamento = 'Aguardando Pagamento',
    Pago = 'Pago',
    Cancelado = 'Cancelado',
  }
