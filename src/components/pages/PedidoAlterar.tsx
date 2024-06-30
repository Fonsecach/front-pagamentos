import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import "./PessoaCadastrar.css";

function PedidoAlterar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [dataDoPedido, setDataDoPedido] = useState<Date | undefined>(
    new Date()
  );
  const [dataDoVencimento, setDataDoVencimento] = useState<Date | undefined>(
    new Date()
  );
  const [devedorID, setDevedorID] = useState<number | null>(null);
  const [credorID, setCredorID] = useState<number | null>(null);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    console.log("ID do pedido:", id);
    const fetchPedido = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5241/api/pedido/exibir/id/${id}`
        );
        const pedido = response.data;
        setNome(pedido.nome);
        setDescricao(pedido.descricao);
        setValorTotal(pedido.valorTotal.toString());
        setDataDoPedido(new Date(pedido.dataDoPedido));
        setDataDoVencimento(new Date(pedido.dataDoVencimento));
        setDevedorID(pedido.devedorID);
        setCredorID(pedido.credorID);
      } catch (error: any) {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro",
            detail: "Erro ao buscar o pedido.",
          });
        }
      }
    };

    fetchPedido();
  }, [id]);

  const atualizarPedido = async (e: React.FormEvent) => {
    e.preventDefault();

    const pedido = {
      nome: nome,
      descricao: descricao,
      valorTotal: parseFloat(valorTotal),
      dataDoPedido: dataDoPedido?.toISOString(),
      dataDoVencimento: dataDoVencimento?.toISOString(),
      devedorID: devedorID,
      credorID: credorID,
    };

    try {
      const response = await axios.put(
        `http://localhost:5241/api/pedido/alterar/${id}`,
        pedido,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Atualização realizada com sucesso!",
          detail: "Pedido atualizado com sucesso.",
        });
      }
      navigate("/pedidos");
    } catch (error: any) {
      if (error.response) {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro ao atualizar pedido!",
            detail: error.response.data.message,
          });
        }
      } else if (error.request) {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro ao atualizar pedido!",
            detail: "Sem resposta do servidor",
          });
        }
      } else {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro ao atualizar pedido!",
            detail: error.message,
          });
        }
      }
    }
  };

  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setValorTotal("");
    setDataDoPedido(new Date());
    setDataDoVencimento(new Date());
    setDevedorID(null);
    setCredorID(null);
  };

  return (
    <div className="pedido-alterar">
      <Card title="Alterar Pedido">
        <Toast ref={toast} />
        <form onSubmit={atualizarPedido}>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
            />
          </div>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
              required
            />
          </div>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={valorTotal}
              onChange={(e) => setValorTotal(e.target.value)}
              placeholder="Valor Total"
              required
            />
          </div>
          <div className="mb-3 pb">
            <Calendar
              className="w-full"
              value={dataDoPedido}
              onChange={(e) => setDataDoPedido(e.value as Date)}
              placeholder="Data do Pedido"
              required
            />
          </div>
          <div className="mb-3 pb">
            <Calendar
              className="w-full"
              value={dataDoVencimento}
              onChange={(e) => setDataDoVencimento(e.value as Date)}
              placeholder="Data do Vencimento"
              required
            />
          </div>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={devedorID !== null ? devedorID.toString() : ""}
              onChange={(e) => setDevedorID(parseInt(e.target.value))}
              placeholder="ID do Devedor"
              required
            />
          </div>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={credorID !== null ? credorID.toString() : ""}
              onChange={(e) => setCredorID(parseInt(e.target.value))}
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

export default PedidoAlterar;
