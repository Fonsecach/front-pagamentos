
export interface Pagamento {
    iD: number;
    valor: number;
    dataDePagamento: string;
    pedidoID: number;
    devedorID: number;
    credorID: number;
}