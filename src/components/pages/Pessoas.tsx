import React, { useState, useEffect } from 'react';
import { Pessoa } from '../../models/Pessoa';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Pessoas() {

  const [pessoas, setPessoas] = useState<Pessoa[]>([]); 
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

  return (
    <div>
        <h1>Lista de pessoas</h1>
        <div className="card">
          <DataTable value={pessoas} tableStyle={{ minWidth: '50rem' }}> 
            <Column field='nome' header='Nome'></Column>
            <Column field='nomeFantasia' header='Nome fantasia'></Column>
            <Column field='numDocumento' header='Documento'></Column>
            <Column field='observacoes' header='Observações'></Column>
          </DataTable>
        </div>
    </div>
  );
}

export default Pessoas;