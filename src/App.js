import logo from './logo.svg';
import './App.css';
import Login from './Components/login';
import Home from './Components/homepage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            {/* {isAllowed && (  
        )} */}
            {/* <Route path="/home" element={<Home />} /> */}
          </Routes>
        </BrowserRouter>
  );
}

export default App;
