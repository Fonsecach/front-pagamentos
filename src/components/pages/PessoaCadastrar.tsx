import React, { useState } from 'react';
import { Pessoa,  } from '../../models/Pessoa';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import './PessoaCadastrar.css';

function PessoaCadastrar() {
  const [nome, setNome] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [tipo, setTipo] = useState("");
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

  const cadastrarPessoa = async (e: React.FormEvent) => {
    e.preventDefault();

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
      criadoEm: criadoEm.toISOString(),
      atualizadoEm: atualizadoEm.toISOString(),
      observacoes: observacoes
    };

    console.log(JSON.stringify(pessoa));

    try {
      const response = await axios.post('http://localhost:5241/api/pessoas/cadastrar/v2', pessoa, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
    }
  };

  return (
    <div className="pessoa-cadastrar">
      <Card title="Cadastrar Pessoa">
        <form onSubmit={cadastrarPessoa}>
        <div className="mb-3 pb">
        <div className="mb-3 pb">
          <RadioButton name="tipo" value="juridica" onChange={(e) => setTipo(e.value)} checked={tipo === 'juridica'} />
          <label htmlFor="juridica">Jurídica</label>
          <RadioButton name="tipo" value="fisica" onChange={(e) => setTipo(e.value)} checked={tipo === 'fisica'} />
          <label htmlFor="fisica">Física</label>
        </div>
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
            <InputText className="p-inputtext-lg w-full" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} placeholder="Logradouro" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Número" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="Complemento" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="Bairro" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Cidade" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={estado} onChange={(e) => setEstado(e.target.value)} placeholder="Estado" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="CEP" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Telefone" />
          </div>
          <div className="mb-3 pb">
            <InputText className="p-inputtext-lg w-full" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Observações" />
          </div>
          <div className="mb-3 pb">
            <Button label="Cadastrar" icon="pi pi-user-plus" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default PessoaCadastrar;
