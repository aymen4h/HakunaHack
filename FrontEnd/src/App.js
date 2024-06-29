import './App.css';
import Spacetec from './components/spacetec/Spacetec';
import News from './components/news/News';
import Chat1 from './components/chat/Chat1';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import Map from './components/map/Map';
import Dashboard from './components/dashboard/Dashboard';
import {BrowserRouter,Route,Routes}from "react-router-dom";



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element= {<News />} />
        <Route path="/login" exact element= {<Login />} />
        <Route path="/chat" exact element= {<Chat1 />} />
        
        <Route path="/map" exact element= {<Map />} />
        
        <Route path="/dashboard" exact element= {<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
