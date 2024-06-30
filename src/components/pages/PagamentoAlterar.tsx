import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import "./PessoaCadastrar.css"; // Usando o mesmo estilo de PessoaCadastrar

function PagamentoAlterar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [valor, setValor] = useState<string>("");
  const [dataDePagamento, setDataDePagamento] = useState<Date | undefined>(
    new Date()
  );
  const [pedidoID, setPedidoID] = useState<string>("");
  const [devedorID, setDevedorID] = useState<string>("");
  const [credorID, setCredorID] = useState<string>("");
  const toast = useRef<Toast>(null);

  useEffect(() => {
    console.log("ID do pagamento:", id);
    const fetchPagamento = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5241/api/pagamentos/exibir/${id}`
        );
        const pagamento = response.data;
        console.log("Dados do pagamento:", pagamento);
        setValor(pagamento.valor.toString());
        setDataDePagamento(new Date(pagamento.dataDePagamento));
        setPedidoID(pagamento.pedidoID.toString());
        setDevedorID(pagamento.devedorID.toString());
        setCredorID(pagamento.credorID.toString());
      } catch (error: unknown) {
        console.error("Erro ao buscar o pagamento:", error);
        if (toast.current) {
          let errorMessage = "Erro ao buscar o pagamento.";
          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data.message || error.message;
          }
          toast.current.show({
            severity: "error",
            summary: "Erro",
            detail: errorMessage,
          });
        }
      }
    };

    fetchPagamento();
  }, [id]);

  const atualizarPagamento = async (e: React.FormEvent) => {
    e.preventDefault();

    const pagamento = {
      valor: parseFloat(valor),
      dataDePagamento: dataDePagamento?.toISOString(),
      pedidoID: parseInt(pedidoID),
      devedorID: parseInt(devedorID),
      credorID: parseInt(credorID),
    };

    try {
      const response = await axios.put(
        `http://localhost:5241/api/pagamentos/alterar/${id}`,
        pagamento,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resposta da API:", response.data);
      if (toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Atualização realizada com sucesso!",
          detail: "Pagamento atualizado com sucesso.",
        });
      }
      navigate("/pagamentos");
    } catch (error: unknown) {
      console.error("Erro ao atualizar o pagamento:", error);
      if (toast.current) {
        let errorMessage = "Erro ao atualizar pagamento.";
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data.message || error.message;
        }
        toast.current.show({
          severity: "error",
          summary: "Erro ao atualizar pagamento!",
          detail: errorMessage,
        });
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
    <div className="pagamento-alterar">
      <Card title="Alterar Pagamento">
        <Toast ref={toast} />
        <form onSubmit={atualizarPagamento}>
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
            <Button type="submit" label="Atualizar" icon="pi pi-save" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default PagamentoAlterar;
