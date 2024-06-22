import React, { useState } from 'react';
import { Pessoa, TipoPessoa } from '../../models/Pessoa';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import './PessoaCadastrar.css';

function PessoaCadastrar() {
  const [nome, setNome] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [tipo, setTipo] = useState<TipoPessoa>(TipoPessoa.Juridica);
  const [criadoEm] = useState<Date>(new Date());
  const [atualizadoEm] = useState<Date>(new Date());
  const [observacoes, setObservacoes] = useState("");

  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telefone, setTelefone] = useState("");

  const tipos = ['Juridica', 'Fisica'];

  const cadastrarPessoa = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do submit

    const pessoa: Pessoa = {
      id: 0, // A API geralmente atribui o ID
      nome: nome,
      nomeFantasia: nomeFantasia,
      numDocumento: numDocumento,
      tipo: tipo,
      enderecos: [{
        id: 0, 
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        cep: cep,
        pessoaId: 0 // Será atualizado após a criação da pessoa
      }],
      contatos: [{
        id: 0, 
        email: email,
        whatsapp: whatsapp,
        telefone: telefone,
        pessoaId: 0 // Será atualizado após a criação da pessoa
      }],
      criadoEm: criadoEm,
      atualizadoEm: atualizadoEm,
      observacoes: observacoes,
    };

    axios.post('http://localhost:5241/api/pessoas/cadastrar', pessoa)
    .then((response) => {
      const createdPessoa = response.data;
      const newId = createdPessoa.id + 1;

      console.log('Pessoa cadastrada com sucesso:', createdPessoa);
      console.log('Novo ID (ID + 1):', newId);

    })
    .catch((error) => {
      console.error('Erro ao cadastrar a pessoa:', error);
    });

  };

  return (
    <div className='card flex justify-content-center'>
      <Card title="Cadastrar Pessoa">
        <form onSubmit={cadastrarPessoa} className='pessoa-form'>
          <div className="mb-3">
            <Dropdown value={tipo} onChange={(e) => setTipo(e.value)} options={tipos} optionLabel="name"
              editable placeholder="Pessoa" className="w-full md:w-14rem custom-dropdown" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} placeholder="Nome fantasia" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={numDocumento} onChange={(e) => setNumDocumento(e.target.value)} placeholder="CPF/CNPJ" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} placeholder="Logradouro" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Número" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="Complemento" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Bairro" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Cidade" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={estado} onChange={(e) => setEstado(e.target.value)} placeholder="Estado" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="CEP" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" />
          </div>
          <div className="mb-3">
            <InputText className="p-inputtext-lg w-full" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Observações" />
          </div>
          <div className="mb-3">
            <Button label="Cancel" icon="pi pi-times" severity="secondary" outlined disabled />
            <Button label="Cadastrar" icon="pi pi-user-plus" className='ml-3'></Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default PessoaCadastrar;
