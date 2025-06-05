import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SendMessege from './pages/SendMessege';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send-message" element={<SendMessege />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App;