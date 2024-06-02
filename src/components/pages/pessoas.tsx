import { useEffect, useState } from "react";
import { Pessoa, TipoPessoa } from '../../models/Pessoa';
import axios from 'axios';

function ListarPessoas() {
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
            <h1>Lista de Pessoas</h1>
            {pessoas.map(pessoa => (
                <div key={pessoa.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h2>{pessoa.nome}</h2>
                    <p><strong>Documento:</strong> {pessoa.numDocumento}</p>
                    <p><strong>Tipo:</strong> {pessoa.tipo === TipoPessoa.Fisica ? 'Física' : 'Jurídica'}</p>
                    <p><strong>Criado em:</strong> {new Date(pessoa.criadoEm).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}

export default ListarPessoas;
