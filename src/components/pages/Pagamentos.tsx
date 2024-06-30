import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link, useNavigate } from "react-router-dom";

interface Pagamento {
  id: number;
  valor: number;
  dataDePagamento: string;
  pedidoID: number;
  devedorID: number;
  credorID: number;
}

const Pagamentos = () => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPagamentos();
  }, []);

  async function fetchPagamentos() {
    try {
      const response = await axios.get<Pagamento[]>(
        "http://localhost:5241/api/pagamentos/exibir"
      );
      setPagamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar a lista de pagamentos:", error);
    }
  }

  function deletarPagamento(id: number) {
    axios
      .delete(`http://localhost:5241/api/pagamentos/deletar/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchPagamentos();
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar o pagamento:", error);
      });
  }

  function editarPagamento(id: number) {
    navigate(`/pagamentos/editar/${id}`);
  }

  return (
    <div>
      <Card title="Lista de Pagamentos">
        <div className="card">
          <Link to="/pagamentos/cadastrar">
            <Button
              label="Cadastrar Novo Pagamento"
              icon="pi pi-plus"
              className="p-button-outlined mb-3"
            />
          </Link>
          <DataTable value={pagamentos} tableStyle={{ minWidth: "50rem" }}>
            <Column field="id" header="ID"></Column>
            <Column field="valor" header="Valor"></Column>
            <Column field="dataDePagamento" header="Data de Pagamento"></Column>
            <Column field="pedidoID" header="ID do Pedido"></Column>
            <Column field="devedorID" header="ID do Devedor"></Column>
            <Column field="credorID" header="ID do Credor"></Column>
            <Column
              field="id"
              header=""
              body={(rowData) => (
                <Button
                  icon="pi pi-pencil"
                  className="p-button-outlined"
                  onClick={() => editarPagamento(rowData.id)}
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
                  onClick={() => deletarPagamento(rowData.id)}
                />
              )}
            ></Column>
          </DataTable>
        </div>
      </Card>
    </div>
  );
};

export default Pagamentos;
