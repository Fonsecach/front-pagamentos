import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import NavigationMenu from '../src/components/NavigationMenu'; 
import Pessoas from './components/pages/Pessoas';
import Pedidos from './components/pages/Pedidos';
import Pagamentos from './components/pages/Pagamentos';

const AppRoutes = () => {
  return (
    <Router>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
