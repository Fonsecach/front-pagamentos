import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link, useNavigate } from "react-router-dom";

interface Pedido {
  id: number;
  nome: string;
  descricao: string;
  valorTotal: number;
  dataDoPedido: string;
  dataDoVencimento: string;
  devedorID: number;
  credorID: number;
}

const Pedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPedidos();
  }, []);

  async function fetchPedidos() {
    try {
      const response = await axios.get<Pedido[]>(
        "http://localhost:5241/api/pedido/exibir"
      );
      setPedidos(response.data);
    } catch (error) {
      console.error("Erro ao buscar a lista de pedidos:", error);
    }
  }

  function deletarPedido(id: number) {
    axios
      .delete(`http://localhost:5241/api/pedido/deletar/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchPedidos();
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar o pedido:", error);
      });
  }

  function editarPedido(id: number) {
    navigate(`/pedidos/editar/${id}`);
  }

  return (
    <div>
      <Card title="Lista de Pedidos">
        <div className="card">
          <Link to="/pedidos/cadastrar">
            <Button
              label="Cadastrar Novo Pedido"
              icon="pi pi-plus"
              className="p-button-outlined mb-3"
            />
          </Link>
          <DataTable value={pedidos} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="nome" header="Nome"></Column>
            <Column field="descricao" header="Descrição"></Column>
            <Column field="valorTotal" header="Valor Total"></Column>
            <Column field="dataDoPedido" header="Data do Pedido"></Column>
            <Column
              field="dataDoVencimento"
              header="Data do Vencimento"
            ></Column>
            <Column field="devedorID" header="ID do Devedor"></Column>
            <Column field="credorID" header="ID do Credor"></Column>
            <Column
              field="id"
              header=""
              body={(rowData) => (
                <Button
                  icon="pi pi-pencil"
                  className="p-button-outlined"
                  onClick={() => editarPedido(rowData.id)}
                />
              )}
            ></Column>
            <Column
              field="id"
              header=""
              body={(rowData) => (
                <Button
                  icon="pi pi-trash"
                  className="p-button-outlined"
                  onClick={() => deletarPedido(rowData.id)}
                />
              )}
            ></Column>
          </DataTable>
        </div>
      </Card>
    </div>
  );
};

export default Pedidos;
