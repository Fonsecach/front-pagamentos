import React, { useState, useRef } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import "./PessoaCadastrar.css"; // Usando o mesmo estilo de PessoaCadastrar

function PedidoCadastrar() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [dataDoPedido, setDataDoPedido] = useState<Date | Date[]>(new Date());
  const [dataDoVencimento, setDataDoVencimento] = useState<Date | Date[]>(
    new Date()
  );
  const [devedorID, setDevedorID] = useState<number | null>(null);
  const [credorID, setCredorID] = useState<number | null>(null);
  const toast = useRef<Toast>(null);

  const cadastrarPedido = async (e: React.FormEvent) => {
    e.preventDefault();

    const pedido = {
      nome: nome,
      descricao: descricao,
      valorTotal: parseFloat(valorTotal),
      dataDoPedido: (dataDoPedido as Date).toISOString(),
      dataDoVencimento: (dataDoVencimento as Date).toISOString(),
      devedorID: devedorID,
      credorID: credorID,
    };

    try {
      const response = await axios.post(
        "http://localhost:5241/api/pedido/cadastrar/v2",
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
          summary: "Cadastro realizado com sucesso!",
          detail: "Pedido cadastrado com sucesso.",
        });
      }
      limparFormulario();
    } catch (error: any) {
      if (error.response) {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro ao cadastrar pedido!",
            detail: error.response.data.message,
          });
        }
      } else if (error.request) {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro ao cadastrar pedido!",
            detail: "Sem resposta do servidor",
          });
        }
      } else {
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Erro ao cadastrar pedido!",
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
    <div className="pedido-cadastrar">
      <Card title="Cadastrar Pedido">
        <Toast ref={toast} />
        <form onSubmit={cadastrarPedido}>
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
              value={devedorID || ""}
              onChange={(e) => setDevedorID(parseInt(e.target.value))}
              placeholder="ID do Devedor"
              required
            />
          </div>
          <div className="mb-3 pb">
            <InputText
              className="p-inputtext-lg w-full"
              value={credorID || ""}
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
            <Button type="submit" label="Cadastrar" icon="pi pi-save" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default PedidoCadastrar;
