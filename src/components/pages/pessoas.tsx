import { useEffect, useState } from "react";
import {Pessoa} from '../../models/Pessoa'

function ListarPessoa(){
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    useEffect(() => {
        console.log('Componente inicializado');
        carregarPessoas();
    }, []);
    
    function carregarPessoas(){
        
    }

};