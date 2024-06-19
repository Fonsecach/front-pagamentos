

export interface Pedido {
    iD: number;
    valorTotal: number | null;
    nome: string | null;
    descricao: string | null;
    dataDoPedido: string;
    dataDoVencimento: string;
    status: string;
    devedorID: number;
    credorID: number;
}