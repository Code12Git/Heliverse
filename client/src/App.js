import Navbar from './components/base/Navbar';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Team from './pages/Team';

function App() {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </div>
  );
}

export default App;
