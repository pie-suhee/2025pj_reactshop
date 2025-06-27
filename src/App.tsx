import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTop } from './helpers/helpers';

import Footer from './components/Footer';
import Nav from './components/Nav';

import Error from './views/Error';
import Index from './views/Index';

import './assets/css/tailwind.css';
import './assets/css/style.css';

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <main className='drawer'>
        <Nav />
        <section className='drawer-content'>
          <section className='main pt-16'>
            <Routes>
              <Route path='*' element={<Error />} />
              <Route path='/' element={<Index />} />
            </Routes>
          </section>
          <Footer />
        </section>
      </main>
    </HashRouter>
  );
}

export default App;
