import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import NavigationMenu from "../src/components/NavigationMenu";
import Pessoas from "./components/pages/Pessoas";
import Pedidos from "./components/pages/Pedidos";
import Pagamentos from "./components/pages/Pagamentos";
import PessoaCadastrar from "./components/pages/PessoaCadastrar";
import PessoaEditar from "./components/pages/PessoaEditar";
import PagamentoCadastrar from "./components/pages/PagamentoCadastrar";
import PagamentoEditar from "./components/pages/PagamentoAlterar";
import PedidoCadastrar from "./components/pages/PedidoCadastrar";
import PedidoAlterar from "./components/pages/PedidoAlterar";

const AppRoutes = () => {
  return (
    <Router>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/pessoas/cadastrar" element={<PessoaCadastrar />} />
        <Route path="/pessoas/editar/:id" element={<PessoaEditar />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/pagamentos/cadastrar" element={<PagamentoCadastrar />} />
        <Route path="/pagamentos/editar/:id" element={<PagamentoEditar />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/pedidos/cadastrar" element={<PedidoCadastrar />} />
        <Route path="/pedidos/editar/:id" element={<PedidoAlterar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
