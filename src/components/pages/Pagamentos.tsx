import React, { useEffect, useState } from 'react';
import { Pagamento } from '../../models/pagamento';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Pagamentos = () => {
    const [pagamentos, setPagamentos] = useState<Pagamento[]>([]); 
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Componente inicializado');
        fetchPagamentos();
    }, []);

    async function fetchPagamentos() {
        try {
            const response = await axios.get<Pagamento[]>('http://localhost:5241/api/pagamentos/exibir');
            setPagamentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar a lista de pagamentos:', error);
        }
    }

    function DeletarPagamentos(id: number) {
        axios.delete(`http://localhost:5241/api/pagamentos/deletar/${id}`)
            .then(response => {
                if (response.status === 200) {
                    fetchPagamentos();
                }
            })
            .catch(error => {
                console.error('Erro ao deletar o pagamento:', error);
            });
    }
    
    function EditarPagamentos(id: number) {
        navigate(`/pagamentos/editar/${id}`);
    }
    
    return (
        <div>
            <header>
            </header>
            <main>
              <h1>Lista de pagamentos</h1>
              <Divider align="right">
                <Button label="Cadastrar" icon="pi pi-user-plus" className="p-button-outlined"></Button>
              </Divider>
              <div className="card">
                <DataTable value={pagamentos} tableStyle={{ minWidth: '50rem' }}> 
                  <Column field='id' header='Id'></Column>
                  <Column field='valor' header='Valor'></Column>
                  <Column field='dataDePagamento' header='Data de pagamento'></Column>
                  <Column field='devedorID' header='Devedor'></Column>
                  <Column field='credorID' header='Credor'></Column>
                  <Column field='dataDePagamento' header='Data de pagamento'></Column>
                  <Column field='id' header='' body={(rowData) => (
                    <Button icon="pi pi-pencil" className="p-button-outlined" onClick={() => EditarPagamentos(rowData.id)} />
                  )}></Column>
                  <Column field='id' header='' body={(rowData) => (
                    <Button icon="pi pi-trash" className="p-button-outlined" onClick={() => DeletarPagamentos(rowData.id)} />
                  )}></Column>
                </DataTable>
              </div>
            </main>
        </div>
    );
}

export default Pagamentos;