import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pessoa } from '../../models/Pessoa';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import './PessoaCadastrar.css';
import { Toast } from 'primereact/toast';

function PessoaEditar() {
  const { id } = useParams<{ id: string }>();
  
  // Estados para os dados da pessoa
  const [nome, setNome] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [tipo, setTipo] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // Estados para o endereço
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  // Estados para o contato
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telefone, setTelefone] = useState("");

  const toast = useRef<Toast>(null);

  useEffect(() => {
    const carregarDadosPessoa = async () => {
      try {
        const response = await axios.get(`http://localhost:5241/exibir/id/${id}`);
        const pessoa: Pessoa = response.data;

        // Preencher os estados com os dados da pessoa
        setNome(pessoa.nome || "");
        setNomeFantasia(pessoa.nomeFantasia || "");
        setNumDocumento(pessoa.numDocumento || "");
        setTipo(pessoa.tipo || "");
        setObservacoes(pessoa.observacoes || "");

        // Preencher os estados com os dados do endereço (se houver)
        if (pessoa.enderecos && pessoa.enderecos.length > 0) {
          const endereco = pessoa.enderecos[0];
          setLogradouro(endereco.logradouro || "");
          setNumero(endereco.numero || "");
          setComplemento(endereco.complemento || "");
          setBairro(endereco.bairro || "");
          setCidade(endereco.cidade || "");
          setEstado(endereco.estado || "");
          setCep(endereco.cep || "");
        }
        
        // Preencher os estados com os dados do contato (se houver)
        if (pessoa.contatos && pessoa.contatos.length > 0) {
          const contato = pessoa.contatos[0];
          setEmail(contato.email || "");
          setWhatsapp(contato.whatsapp || "");
          setTelefone(contato.telefone || "");
        }
      } catch (error) {
        console.error('Erro ao carregar dados da pessoa:', error);
      }
    };

    carregarDadosPessoa();
  }, [id]);

  const atualizarPessoa = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      console.error('ID não fornecido');
      return;
    }

    // Montar o objeto Pessoa com as informações coletadas
    const pessoa: Pessoa = 
    {
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

    try {
      // Realizar a requisição PUT para o endpoint correto
      const response = await axios.put(`http://localhost:5241/api/pessoas/alterar/${id}`, pessoa, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      if (toast.current) {
        toast.current.show({ severity: 'success', summary: 'Atualização realizada com sucesso!', detail: 'Pessoa atualizada com sucesso.' });
      }
    } catch (error) {
      console.error('Erro ao editar pessoa:', error);
      if (toast.current) {
        toast.current.show({ severity: 'error', summary: 'Erro ao editar pessoa!', detail: 'Verifique os dados informados.' });
      }
    }
  };

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
            <Button type="button" severity="secondary" outlined label="Limpar" icon="pi pi-refresh" onClick={() => window.location.reload()} />
            <Button type="submit" label="Atualizar" icon="pi pi-save" />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default PessoaEditar;