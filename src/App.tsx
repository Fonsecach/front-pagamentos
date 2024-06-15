import React from 'react';
import Navigation from './components/navigator';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListarPessoas from './components/pages/pessoas';
import Footer from './components/footer';



function App() {
  return (
    <div className="App">
      <header>
        <Navigation></Navigation>
      </header>
      <main>
        <h1>Teste</h1>
        <div>
        <ListarPessoas></ListarPessoas>
        </div>
        <footer><Footer></Footer></footer>
      </main>
    </div>
  );
}

export default App;
