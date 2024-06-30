import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pessoa } from '../../models/Pessoa';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import './PessoaCadastrar.css';
import { Toast } from 'primereact/toast';

function PessoaEditar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  const toast = useRef(null); 
  const [nome, setNome] = useState<string>("");
  const [nomeFantasia, setNomeFantasia] = useState<string>("");
  const [numDocumento, setNumDocumento] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [observacoes, setObservacoes] = useState<string>("");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5241/api/pessoas/exibir/id/${id}`)
        .then(response => {
          setNome(response.data.nome || "");
          setNomeFantasia(response.data.nomeFantasia || "");
          setNumDocumento(response.data.numDocumento || "");
          setTipo(response.data.tipo || "");
          setObservacoes(response.data.observacoes || "");

        });
    }
  }, [id]);

  function atualizarPessoa(e: React.FormEvent) {
    e.preventDefault();
  
    if (!id) {
      console.error('ID não fornecido');
      return;
    }
  
    const pessoa: Pessoa = {
      id: parseInt(id, 10), // Converter ID para número inteiro
      nome: nome,
      nomeFantasia: nomeFantasia,
      numDocumento: numDocumento,
      tipo: tipo,
      observacoes: observacoes,
      enderecos: null,
      contatos: null,
      criadoEm: '' 
    };
  
    axios.put(`http://localhost:5241/api/pessoas/alterar/${id}`, pessoa)
      .then(() => {
        if (toast.current) {
            (toast.current as Toast).show({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa atualizada', life: 3000 });
        }
        navigate(`/pessoas/${id}`);
      })
      .catch(() => {
        if (toast.current) {
            (toast.current as Toast).show({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar pessoa', life: 3000 });
        }
      });
  }

  return (
    <div className="pessoa-cadastrar">
      <Card title="Editar Pessoa">
        <Toast ref={toast} />
        <form onSubmit={atualizarPessoa}>
          <div className="mb-3 pb">
            <RadioButton name="tipo" value="juridica" onChange={(e) => setTipo(e.value)} checked={tipo === 'juridica'} />
            <label htmlFor="juridica">Jurídica</label>
            <RadioButton name="tipo" value="fisica" onChange={(e) => setTipo(e.value)} checked={tipo === 'fisica'} />
            <label htmlFor="fisica">Física</label>
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} placeholder="Nome Fantasia" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={numDocumento} onChange={(e) => setNumDocumento(e.target.value)} placeholder="Número do Documento" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" placeholder="Observações" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full"  placeholder='Logradouro' />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" />
          </div>
          <div className="mb-3 pb">
            <Button type="button" severity="secondary" outlined label="Limpar" icon="pi pi-refresh" onClick={() => window.location.reload()} />
            <Button type="submit" label="Atualizar" icon="pi pi-save" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default PessoaEditar;