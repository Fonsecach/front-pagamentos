import React, { useState, useEffect } from 'react';
import { Pessoa } from '../../models/Pessoa';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Link, useNavigate } from 'react-router-dom';

function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]); 
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Componente inicializado');
    fetchPessoas();
  }, []);

  async function fetchPessoas() {
    try {
      const response = await axios.get<Pessoa[]>('http://localhost:5241/api/pessoas/exibir');
      setPessoas(response.data);
    } catch (error) {
      console.error('Erro ao buscar a lista de pessoas:', error);
    }
  }

  function DeletarPessoas(id: number) {
    axios.delete(`http://localhost:5241/api/pessoas/deletar/${id}`)
      .then(response => {
        if (response.status === 200) {
          fetchPessoas();
        }
      })
      .catch(error => {
        console.error('Erro ao deletar a pessoa:', error);
      });
  }

  function EditarPessoas(id: number) {
    navigate(`/pessoas/editar/${id}`);
  }

  return (
    <div>
        <h1>Lista de Pessoas</h1>
        <Divider align="right">
            <Link to="/pessoas/cadastrar"><Button label="Cadastrar" icon="pi pi-user-plus" className="p-button-outlined"></Button></Link>
        </Divider>

        <div className="card">
          <DataTable value={pessoas} tableStyle={{ minWidth: '50rem' }}> 
            <Column field='nome' header='Nome'></Column>
            <Column field='nomeFantasia' header='Nome fantasia'></Column>
            <Column field='numDocumento' header='Documento'></Column>
            <Column field='observacoes' header='Observações'></Column>
            <Column field='id' header='' body={(rowData) => (
              <Button icon="pi pi-pencil" className="p-button-outlined" onClick={() => EditarPessoas(rowData.id)} />
            )}></Column>
            <Column field='id' header='' body={(rowData) => (
              <Button icon="pi pi-trash" className="p-button-outlined" onClick={() => DeletarPessoas(rowData.id)} />
            )}></Column>
          </DataTable>
        </div>
    </div>
  );
}

export default Pessoas;