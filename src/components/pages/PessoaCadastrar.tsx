import React, { useState, useEffect } from 'react';
import { Pessoa } from '../../models/Pessoa';
import { Enderecos } from '../../models/Enderecos';
import { Contato } from '../../models/Contatos';
import axios from 'axios';
import { TipoPessoa } from '../../models/Pessoa'; // Importe o enum TipoPessoa

function PessoaCadastrar() {
  const [nome, setNome] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [tipo, setTipo] = useState<TipoPessoa>(TipoPessoa.Fisica); // Define o valor inicial do tipo
  const [enderecos, setEnderecos] = useState<Enderecos[]>([]);
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [criadoEm, setCriadoEm] = useState<Date>(new Date());
  const [atualizadoEm, setAtualizadoEm] = useState<Date>(new Date());
  const [observacoes, setObservacoes] = useState("");

  const cadastrarPessoa = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do submit
    const pessoa: Pessoa = {
      nome: nome,
      nomeFantasia: nomeFantasia,
      numDocumento: numDocumento,
      tipo: tipo,
      enderecos: enderecos,
      contatos: contatos,
      criadoEm: criadoEm,
      atualizadoEm: atualizadoEm,
      observacoes: observacoes,
    };
    axios.post('http://localhost:5241/api/pessoas/cadastrar', pessoa)
      .then((response) => {
        console.log('Pessoa cadastrada com sucesso:', response.data);
      })
      .catch((error) => {
        console.error('Erro ao cadastrar a pessoa:', error);
      });
  };

  return (
    <div>
      <h1>Cadastrar Pessoa</h1>
      <form onSubmit={cadastrarPessoa}> {/* Cria um formulário */}
        {/* Adicione os inputs para cada estado aqui */}
        {/* Exemplo: */}
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" /> 
        {/* Adicione os demais inputs de acordo com a estrutura da pessoa */}
        <button type="submit">Cadastrar</button> 
      </form>
    </div>
  );
}

export default PessoaCadastrar;