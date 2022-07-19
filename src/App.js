import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={"/:name"} element={<Home />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
