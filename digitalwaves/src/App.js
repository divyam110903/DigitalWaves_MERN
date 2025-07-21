import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import Clients from './pages/Clients';
import About from './pages/About';
import Home from './pages/Home';
import Admin from './admin/Pages/Admin';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
       
          <Route path="/images/*" element={null} />

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />
         <Route path="/admin/*" element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;