import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useRef } from 'react';

import { ScrollToTop } from './helpers/helpers';

import Footer from './components/Footer';
import Nav from './components/Nav';
import Drawer from './components/Drawer';

import Error from './views/Error';
import Index from './views/Index';
import Fashion from './views/Fashion';
import Accessory from './views/Accessory';
import Digital from './views/Digital';

import './assets/css/tailwind.css';
import './assets/css/style.css';

function App() {
  const $hamburger = useRef<HTMLInputElement>(null);
  const closeOverlay = () => {
    $hamburger?.current?.click();
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <main className='drawer'>
        <input type='checkbox' id='side-menu' className='drawer-toggle' ref={$hamburger} />
        <section className='drawer-content'>
          <Nav />
          <section className='main pt-16'>
            <Routes>
              <Route path='*' element={<Error />} />
              <Route path='/' element={<Index />} />
              <Route path='/fashion' element={<Fashion />} />
              <Route path='/accessory' element={<Accessory />} />
              <Route path='/digital' element={<Digital />} />
            </Routes>
          </section>
          <Footer />
        </section>
        <Drawer closeOverlay={closeOverlay} />
      </main>
    </HashRouter>
  );
}

export default App;
