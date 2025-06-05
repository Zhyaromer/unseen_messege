import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SendMessege from './pages/SendMessege';
import About from './pages/About';
import GetPostByID from './pages/GetPostbyID';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send-message" element={<SendMessege />} />
        <Route path="/about" element={<About />} />
        <Route path="/messege/:id" element={<GetPostByID />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App;