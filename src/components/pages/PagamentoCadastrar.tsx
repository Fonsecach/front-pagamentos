import React, { useState, useRef } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import "./PessoaCadastrar.css"; // Usando o mesmo estilo de PessoaCadastrar

function PagamentoCadastrar() {
  const [valor, setValor] = useState<string | undefined>("");
  const [dataDePagamento, setDataDePagamento] = useState<Date | undefined>(
    new Date()
  );
  const [pedidoID, setPedidoID] = useState<string | undefined>("");
  const [devedorID, setDevedorID] = useState<string | undefined>("");
  const [credorID, setCredorID] = useState<string | undefined>("");
  const toast = useRef<Toast>(null);

  const cadastrarPagamento = async (e: React.FormEvent) => {
    e.preventDefault();

    const pagamento = {
      valor: parseFloat(valor!),
      dataDePagamento: dataDePagamento?.toISOString(),
      pedidoID: parseInt(pedidoID!),
      devedorID: parseInt(devedorID!),
      credorID: parseInt(credorID!),
    };

    try {
      const response = await axios.post(
        "http://localhost:5241/api/pagamento/cadastrar",
        pagamento,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Cadastro realizado com sucesso!",
          detail: "Pagamento cadastrado com sucesso.",
        });
      }
      limparFormulario();
    } catch (error: any) {
      if (error.response) {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro ao cadastrar pagamento!",
            detail: error.response.data.message,
          });
        }
      } else if (error.request) {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro ao cadastrar pagamento!",
            detail: "Sem resposta do servidor",
          });
        }
      } else {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro ao cadastrar pagamento!",
            detail: error.message,
          });
        }
      }
    }
  };

  const limparFormulario = () => {
    setValor("");
    setDataDePagamento(new Date());
    setPedidoID("");
    setDevedorID("");
    setCredorID("");
  };

  return (
    <div className="pagamento-cadastrar">
      <Card title="Cadastrar Pagamento">
        <Toast ref={toast} />
        <form onSubmit={cadastrarPagamento}>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Valor"
              required
            />
          </div>
          <div className="mb-3 pb">
            <Calendar
              className="w-full"
              value={dataDePagamento}
              onChange={(e) => setDataDePagamento(e.value as Date)}
              placeholder="Data de Pagamento"
              required
            />
          </div>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={pedidoID}
              onChange={(e) => setPedidoID(e.target.value)}
              placeholder="ID do Pedido"
              required
            />
          </div>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={devedorID}
              onChange={(e) => setDevedorID(e.target.value)}
              placeholder="ID do Devedor"
              required
            />
          </div>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={credorID}
              onChange={(e) => setCredorID(e.target.value)}
              placeholder="ID do Credor"
              required
            />
          </div>
          <div className="mb-3 pb">
            <Button
              type="button"
              severity="secondary"
              outlined
              label="Limpar"
              icon="pi pi-refresh"
              onClick={limparFormulario}
            />
            <Button type="submit" label="Cadastrar" icon="pi pi-save" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default PagamentoCadastrar;
